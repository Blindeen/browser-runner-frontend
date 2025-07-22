import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import { provideToastr } from 'ngx-toastr';

function baseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const preparedRequest = req.clone({
    url: `${environment.apiUrl}${req.url}`,
  });
  return next(preparedRequest);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([baseInterceptor])),
    provideAnimations(),
    provideToastr(),
  ],
};
