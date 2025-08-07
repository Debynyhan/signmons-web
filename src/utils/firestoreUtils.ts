// src/utils/firestoreUtils.ts
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase/firebase';
import type { WizardState, DesignWizardState } from '../types/consultation';

const db = getFirestore(app);
const storage = getStorage(app);

export async function submitDesignRequest(wizard: WizardState) {
  // upload each File
  const logoUrls = await Promise.all(
    wizard.assets.logos.map(async (file) => {
      const path = `logos/${Date.now()}_${file.name}`;
      const ref = storageRef(storage, path);
      await uploadBytes(ref, file);
      return getDownloadURL(ref);
    }),
  );

  // build Firestore payload
  const payload: DesignWizardState = {
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

  // add timestamp and write
  return addDoc(collection(db, 'designRequests'), {
    ...payload,
    createdAt: new Date().toISOString(),
  });
}
