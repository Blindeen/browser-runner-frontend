import { Injectable, signal, inject } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { saveAs } from 'file-saver';

import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private toastService = inject(ToastService);

  codeSignal = signal(localStorage.getItem(env.codeKey) ?? env.codeFallback);
  languageId = signal(102);
  importedCode = signal<string | undefined>(undefined);

  set code(code: string) {
    this.codeSignal.set(code);
    localStorage.setItem(env.codeKey, code);
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.codeSignal());
      this.toastService.success('Code copied to clipboard!');
    } catch {
      this.toastService.error('Access to clipboard denied.');
    }
  }

  importCode(code: string) {
    this.importedCode.set(code);
  }

  exportCode() {
    const file = new File([this.codeSignal()], env.exportFilename, {
      type: 'text/javascript',
    });
    saveAs(file);
  }
}
