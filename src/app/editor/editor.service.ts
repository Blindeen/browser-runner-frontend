import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';

import { environment as env } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

interface SubmissionOutput {
  stdout: string;
  time: string;
  description: string;
  compileOutput: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private httpClient = inject(HttpClient);
  private toastService = inject(ToastrService);
  private codeSignal = signal(env.codeFallback);
  private languageId = signal(102);
  private isRequestPerformedSignal = signal(false);

  constructor() {
    const savedCode = localStorage.getItem(env.codeKey);
    if (savedCode !== null) {
      this.codeSignal.set(savedCode);
    }
  }

  get code() {
    return this.codeSignal();
  }

  set code(code: string) {
    localStorage.setItem(env.codeKey, code);
    this.codeSignal.set(code);
  }

  get isRequestPerformed() {
    return this.isRequestPerformedSignal();
  }

  set isRequestPerformed(value: boolean) {
    this.isRequestPerformedSignal.set(value);
  }

  submitCode() {
    this.httpClient
      .post<SubmissionOutput>('/submissions', {
        sourceCode: this.codeSignal(),
        languageId: this.languageId(),
      })
      .pipe(
        finalize(() => {
          this.isRequestPerformedSignal.set(false);
        })
      )
      .subscribe({
        next: (submissionOutput) => {
          let message;
          if (!submissionOutput.compileOutput) {
            message = `Result: ${submissionOutput.description}\nOutput: ${submissionOutput.stdout}`;
          } else {
            message = `Result: ${submissionOutput.description}\nError: ${submissionOutput.compileOutput}`;
          }
          alert(message);
        },
        error: (errorResponse: HttpErrorResponse) => {
          const { error, status } = errorResponse;
          const message = status !== 0 ? error.message : 'Request failed';
          requestAnimationFrame(() =>
            this.toastService.error(message, 'Error')
          );
        },
      });
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.codeSignal());
      this.toastService.success('Code copied to clipboard!', 'Success');
    } catch {
      this.toastService.error('Access to clipboard denied.', 'Error');
    }
  }
}
