import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { Observable } from 'rxjs';

function baseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const preparedRequest = req.clone({
    url: `http://localhost:3000/api${req.url}`,
  });
  return next(preparedRequest);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([baseInterceptor])),
  ],
};
