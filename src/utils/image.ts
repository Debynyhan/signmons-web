// src/utils/image.ts
// Client-side image compression utility for logo uploads
// - Downscales very large raster images
// - Converts to WebP when available, otherwise falls back to JPEG/PNG
// - Preserves transparency by preferring PNG when alpha is present
// - Skips SVG (keeps vector intact)

export async function compressImage(
  file: File,
  opts: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    mime?: 'image/webp' | 'image/jpeg';
  } = {},
): Promise<File> {
  const { maxWidth = 1600, maxHeight = 1600, quality = 0.85, mime = 'image/webp' } = opts;

  // Skip non-images and SVG (do not rasterize)
  if (file.type === 'image/svg+xml') return file;
  if (!/^image\/(png|jpeg|jpg|webp)$/i.test(file.type)) return file;

  // Try createImageBitmap for fast decode; fallback to HTMLImageElement
  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    bitmap = await loadImageBitmapFallback(file);
  }
  if (!bitmap) return file;

  // Compute scale
  const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
  const targetW = Math.max(1, Math.round(bitmap.width * scale));
  const targetH = Math.max(1, Math.round(bitmap.height * scale));

  // Draw to canvas (strips metadata)
  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return file;
  ctx.imageSmoothingQuality = 'high';
  ctx.clearRect(0, 0, targetW, targetH);
  ctx.drawImage(bitmap, 0, 0, targetW, targetH);

  // Prefer WebP; if not supported on this device, fall back smartly
  let usedMime: 'image/webp' | 'image/jpeg' | 'image/png' = mime;
  let blob = await canvasToBlob(canvas, 'image/webp', quality);
  if (!blob) {
    const hasAlpha = await canvasHasAlpha(canvas);
    if (!hasAlpha) {
      // JPEG gives best size when no transparency
      blob = await canvasToBlob(canvas, 'image/jpeg', clampQuality(quality));
      usedMime = 'image/jpeg';
    }
    if (!blob) {
      // Final guaranteed fallback
      blob = await canvasToBlob(canvas, 'image/png');
      usedMime = 'image/png';
    }
  }

  if (!blob) return file;

  const compressed = new File([blob], renameWithExt(file.name, usedMime), {
    type: usedMime,
    lastModified: Date.now(),
  });
  return compressed.size < file.size ? compressed : file;
}

function clampQuality(q?: number): number | undefined {
  if (typeof q !== 'number') return undefined;
  return Math.min(0.95, Math.max(0.5, q));
}

function renameWithExt(name: string, mime: string): string {
  const base = name.replace(/\.[^.]+$/, '');
  const ext = mime === 'image/jpeg' ? 'jpg' : mime.split('/')[1];
  return `${base}.${ext}`;
}

async function loadImageBitmapFallback(file: File): Promise<ImageBitmap | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = async () => {
      try {
        const bmp = await createImageBitmap(img);
        URL.revokeObjectURL(url);
        resolve(bmp);
      } catch {
        try {
          // Last resort: draw the HTMLImageElement directly
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(null);
          ctx.drawImage(img, 0, 0);
          const b = await canvasToBlob(canvas, 'image/png');
          if (!b) return resolve(null);
          try {
            const bmp = await createImageBitmap(b);
            resolve(bmp);
          } catch {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type?: string,
  quality?: number,
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

async function canvasHasAlpha(canvas: HTMLCanvasElement): Promise<boolean> {
  // Sample on a small canvas for performance
  const sampleSize = 200;
  const s = document.createElement('canvas');
  s.width = sampleSize;
  s.height = sampleSize;
  const c = s.getContext('2d', { alpha: true });
  if (!c) return true; // assume alpha to be safe
  c.imageSmoothingQuality = 'high';
  c.clearRect(0, 0, sampleSize, sampleSize);
  c.drawImage(canvas, 0, 0, sampleSize, sampleSize);
  const data = c.getImageData(0, 0, sampleSize, sampleSize).data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = bytes / Math.pow(k, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${sizes[i]}`;
}
