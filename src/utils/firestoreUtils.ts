// src/utils/firestoreUtils.ts
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase/firebase';
import type { WizardState, DesignWizardState } from '../types/consultation';

const db = getFirestore(app);
const storage = getStorage(app);

/**
 * Uploads an array of File objects to Firebase Storage and returns their download URLs.
 */
async function uploadFiles(files: File[], folder: string): Promise<string[]> {
  const urls = await Promise.all(
    files.map(async (file) => {
      const timestamp = Date.now();
      const fileRef = storageRef(storage, `${folder}/${timestamp}_${file.name}`);
      // Convert File to Uint8Array for environments without Blob support
      const buffer = await file.arrayBuffer();
      const uintArray = new Uint8Array(buffer);
      // Upload bytes with content type metadata
      await uploadBytes(fileRef, uintArray, { contentType: file.type });
      return getDownloadURL(fileRef);
    }),
  );
  return urls;
}

/**
 * Builds the Firestore payload from wizard state and uploaded asset URLs.
 */
function buildRequestPayload(wizard: WizardState, logoUrls: string[]): DesignWizardState {
  return {
    industry: wizard.industry,
    vehicle: wizard.vehicle,
    style: wizard.style,
    assets: { logos: logoUrls, tagline: wizard.assets.tagline.trim() },
    colors: wizard.colors,
    contact: wizard.contact,
    timeline: wizard.timeline,
    budget: wizard.budget,
    details: wizard.details,
  };
}

/**
 * Submits the design request: uploads files, constructs payload, and writes to Firestore.
 */
export async function submitDesignRequest(wizard: WizardState) {
  // Debug: log incoming wizard state
  console.log('submitDesignRequest wizard state:', wizard);

  // 1. Upload logos and get URLs
  // Upload logos and get URLs
  const logoUrls = wizard.assets.logos.length
    ? await uploadFiles(wizard.assets.logos, 'logos')
    : [];
  // Debug: log uploaded logo URLs
  console.log('submitDesignRequest uploaded logo URLs:', logoUrls);

  // 2. Build request payload
  const payload = buildRequestPayload(wizard, logoUrls);
  // Debug: log Firestore payload to be sent
  console.log('submitDesignRequest Firestore payload:', payload);

  // 3. Add timestamp and write to Firestore
  return addDoc(collection(db, 'designRequests'), {
    ...payload,
    createdAt: new Date().toISOString(),
  });
}
