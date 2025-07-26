import { Component } from '@angular/core';

import { HeaderComponent } from './editor/header/header.component';
import { FooterComponent } from './editor/footer/footer.component';
import { CodeEditorComponent } from './editor/code-editor/code-editor.component';
import { ModalComponent } from './editor/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    HeaderComponent,
    FooterComponent,
    CodeEditorComponent,
    ModalComponent,
  ],
})
export class AppComponent {}
