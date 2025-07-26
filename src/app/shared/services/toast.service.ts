import { Injectable, NgZone, inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastrService = inject(ToastrService);
  private ngZone = inject(NgZone);

  success(message: string) {
    this.show('Success', message, 'success');
  }

  error(message: string) {
    this.show('Error', message, 'error');
  }

  private show(title: string, message: string, type: 'success' | 'error') {
    this.ngZone.runOutsideAngular(() => {
      this.toastrService[type](message, title);
    });
  }
}
