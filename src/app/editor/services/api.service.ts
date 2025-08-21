import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

import { ToastService } from '../../shared/services/toast.service';
import { EditorService } from './editor.service';
import { FixResponse, SubmissionOutput, SubmissionResponse } from './types';

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
    this.isRequestPerformed.set(true);
    const submitRequest = this.prepareSubmitRequest();
    submitRequest.subscribe({
      next: ({ stdout, description }) => {
        const message = description === 'Accepted' ? stdout : description;
        this.submissionOutput.set(message);
      },
      error: this.handleError.bind(this),
    });
  }

  fixCode() {
    this.isRequestPerformed.set(true);
    const fixRequest = this.prepareFixRequest();
    fixRequest.subscribe({
      next: ({ code }) => this.editorService.importCode(code),
      error: this.handleError.bind(this),
    });
  }

  private handleError(errorResponse: HttpErrorResponse) {
    const { error, status } = errorResponse;
    const message = status !== 0 ? error.message : 'Request failed';
    this.toastService.error(message);
  }

  private prepareSubmitRequest() {
    return this.httpClient
      .post<SubmissionResponse>('/submissions', {
        sourceCode: this.editorService.codeSignal(),
        languageId: this.editorService.languageId(),
      })
      .pipe(finalize(() => this.isRequestPerformed.set(false)));
  }

  private prepareFixRequest() {
    return this.httpClient
      .post<FixResponse>('/fix', {
        sourceCode: this.editorService.codeSignal(),
      })
      .pipe(finalize(() => this.isRequestPerformed.set(false)));
  }
}
