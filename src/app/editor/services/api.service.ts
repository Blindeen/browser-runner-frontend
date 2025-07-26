import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

import { ToastService } from '../../shared/services/toast.service';
import { SubmissionOutput, SubmissionResponse } from './types';
import { EditorService } from './editor.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private toastService = inject(ToastService);
  private editorService = inject(EditorService);

  isRequestPerformed = signal(false);
  submissionOutput = signal<SubmissionOutput>(undefined);

  submitCode() {
    this.httpClient
      .post<SubmissionResponse>('/submissions', {
        sourceCode: this.editorService.codeSignal(),
        languageId: this.editorService.languageId(),
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
}
