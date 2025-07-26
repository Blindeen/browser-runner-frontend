import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

import { ToastService } from '../../shared/services/toast.service';
import { EditorService } from './editor.service';
import { SubmissionOutput, SubmissionResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private editorService = inject(EditorService);
  private toastService = inject(ToastService);

  isRequestPerformed = signal(false);
  submissionOutput = signal<SubmissionOutput>(undefined);

  submitCode() {
    const submitRequest = this.prepareSubmitRequest();
    submitRequest.subscribe({
      next: ({ stdout, description }) => {
        const message = description === 'Accepted' ? stdout : description;
        this.submissionOutput.set(message);
      },
      error: (errorResponse: HttpErrorResponse) => {
        const { error, status } = errorResponse;
        const message = status !== 0 ? error.message : 'Request failed';
        this.toastService.error(message);
      },
    });
  }

  private prepareSubmitRequest() {
    return this.httpClient
      .post<SubmissionResponse>('/submissions', {
        sourceCode: this.editorService.codeSignal(),
        languageId: this.editorService.languageId(),
      })
      .pipe(finalize(() => this.isRequestPerformed.set(false)));
  }
}
