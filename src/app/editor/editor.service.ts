import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signal, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private code = signal('');
  private httpClient = inject(HttpClient);

  updateCode(code: string) {
    this.code.set(code);
  }
}
