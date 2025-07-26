import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, inject, NgZone } from '@angular/core';
import { environment as env } from '../../../environments/environment';

import { finalize } from 'rxjs';
import { saveAs } from 'file-saver';

import { ToastService } from '../../shared/services/toast.service';
import { SubmissionOutput, SubmissionResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private httpClient = inject(HttpClient);
  private toastService = inject(ToastService);
  private ngZone = inject(NgZone);

  importedCode = signal<string | undefined>(undefined);
  isRequestPerformed = signal(false);
  submissionOutput = signal<SubmissionOutput>(undefined);
  private languageId = 102;
  private codeSignal = signal(
    localStorage.getItem(env.codeKey) ?? env.codeFallback
  );

  set code(code: string) {
    this.codeSignal.set(code);
    localStorage.setItem(env.codeKey, code);
  }

  submitCode() {
    this.httpClient
      .post<SubmissionResponse>('/submissions', {
        sourceCode: this.codeSignal(),
        languageId: this.languageId,
      })
      .pipe(
        finalize(() => {
          this.isRequestPerformed.set(false);
        })
      )
      .subscribe({
        next: (submissionResponse) => {
          let message;
          if (submissionResponse.description === 'Accepted') {
            message = submissionResponse.stdout;
          } else {
            message = submissionResponse.description;
          }
          this.submissionOutput.set(message);
        },
        error: (errorResponse: HttpErrorResponse) => {
          const { error, status } = errorResponse;
          const message = status !== 0 ? error.message : 'Request failed';
          this.toastService.error(message);
        },
      });
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
