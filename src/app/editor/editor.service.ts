import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signal, inject } from '@angular/core';

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
  private code = signal('');
  private languageId = signal(102);

  updateCode(code: string) {
    this.code.set(code);
  }

  submitCode() {
    this.httpClient
      .post<SubmissionOutput>('/submissions', {
        sourceCode: this.code(),
        languageId: this.languageId(),
      })
      .subscribe({
        next: (submissionOutput) => {
          console.log(submissionOutput);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
