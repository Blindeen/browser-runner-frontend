import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private code = signal('');

  updateCode(code: string) {
    this.code.set(code);
  }
}
