import { Component, inject } from '@angular/core';

import { HeaderComponent } from './editor/header/header.component';
import { FooterComponent } from './editor/footer/footer.component';
import { CodeEditorComponent } from './editor/code-editor/code-editor.component';
import { ModalComponent } from './editor/modal/modal.component';
import { LoaderComponent } from './loader/loader.component';
import { ApiService } from './editor/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    HeaderComponent,
    FooterComponent,
    CodeEditorComponent,
    ModalComponent,
    LoaderComponent,
  ],
})
export class AppComponent {
  apiService = inject(ApiService);
}
