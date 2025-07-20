import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';

import { environment as env } from '../../environments/environment';

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
  private codeSignal = signal(env.codeFallback);
  private languageId = signal(102);

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

  submitCode() {
    this.httpClient
      .post<SubmissionOutput>('/submissions', {
        sourceCode: this.codeSignal(),
        languageId: this.languageId(),
      })
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
          alert(errorResponse.error.message);
        },
      });
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.codeSignal());
      alert("Code's been copied.");
    } catch {
      alert('Copying is blocked by the browser policy.');
    }
  }
}
