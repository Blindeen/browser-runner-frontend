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

  get code() {
    return this.codeSignal();
  }

  set code(code: string) {
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
}
