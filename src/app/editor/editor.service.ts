import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, inject, NgZone } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { saveAs } from 'file-saver';
import { EditorView } from 'codemirror';

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
  private toastService = inject(ToastrService);
  private ngZone = inject(NgZone);

  private languageId = 102;
  private view!: EditorView;
  isRequestPerformed = signal(false);
  submissionOutput = signal<string | undefined>(undefined);

  setView(view: EditorView) {
    this.view = view;
  }

  submitCode() {
    this.httpClient
      .post<SubmissionOutput>('/submissions', {
        sourceCode: this.view.state.doc.toString(),
        languageId: this.languageId,
      })
      .pipe(
        finalize(() => {
          this.isRequestPerformed.set(false);
        })
      )
      .subscribe({
        next: (submissionOutput) => {
          let message;
          if (submissionOutput.description === 'Accepted') {
            message = submissionOutput.stdout;
          } else {
            message = submissionOutput.description;
          }
          this.submissionOutput.set(message);
        },
        error: (errorResponse: HttpErrorResponse) => {
          const { error, status } = errorResponse;
          const message = status !== 0 ? error.message : 'Request failed';
          this.ngZone.runOutsideAngular(() =>
            this.toastService.error(message, 'Error')
          );
        },
      });
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.view.state.doc.toString());
      this.toastService.success('Code copied to clipboard!', 'Success');
    } catch {
      this.toastService.error('Access to clipboard denied.', 'Error');
    }
  }

  importCode(code: string) {
    const transaction = this.view.state.update({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: code,
      },
    });
    this.view.dispatch(transaction);
    this.view.focus();
  }

  exportCode() {
    const file = new File(
      [this.view.state.doc.toString()],
      env.exportFilename,
      {
        type: 'text/javascript',
      }
    );
    saveAs(file);
  }
}
