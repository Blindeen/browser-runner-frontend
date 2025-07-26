import { Component, inject } from '@angular/core';

import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';
import { FileImporterComponent } from '../file-importer/file-importer.component';
import { ApiService } from '../services/api.service';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'header',
  imports: [IconButtonComponent, FileImporterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  apiService = inject(ApiService);
  private editorService = inject(EditorService);

  onRunClick() {
    this.apiService.isRequestPerformed.set(true);
    this.apiService.submitCode();
  }

  async onCopyClick() {
    await this.editorService.copyCode();
  }

  onExportClick() {
    this.editorService.exportCode();
  }
}
