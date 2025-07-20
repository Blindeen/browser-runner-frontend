import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';

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
  private codeSignal = signal("console.log('Hello World!');\n");
  private languageId = signal(102);

  constructor() {
    const savedCode = localStorage.getItem('code');
    if (savedCode !== null) {
      this.codeSignal.set(savedCode);
    }
  }

  get code() {
    return this.codeSignal();
  }

  set code(code: string) {
    localStorage.setItem('code', code);
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
