// src/utils/image.ts
// Client-side image compression utility for logo uploads
// - Downscales very large raster images
// - Converts to WebP (or JPEG) with controllable quality
// - Preserves transparency (use WebP)
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

  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
  if (!blob) return file;

  const compressed = new File([blob], renameWithExt(file.name, mime), {
    type: mime,
    lastModified: Date.now(),
  });
  return compressed.size < file.size ? compressed : file;
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
          canvas.toBlob(async (b) => {
            if (!b) return resolve(null);
            try {
              const bmp = await createImageBitmap(b);
              resolve(bmp);
            } catch {
              resolve(null);
            }
          });
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

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = bytes / Math.pow(k, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${sizes[i]}`;
}
