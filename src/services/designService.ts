// src/services/designService.ts
import type { WizardState } from '../types/consultation';
import { submitDesignRequest } from '../utils/firestoreUtils';

export interface DesignService {
  submit(wizard: WizardState): Promise<void>;
}

class DefaultDesignService implements DesignService {
  async submit(wizard: WizardState): Promise<void> {
    await submitDesignRequest(wizard);
  }
}

export const designService: DesignService = new DefaultDesignService();
export type { WizardState };
