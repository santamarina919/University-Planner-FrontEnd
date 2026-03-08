import {HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, HttpResponse, HttpStatusCode} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTES} from './app.routes';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  console.log("running")
  const router = inject(Router)
  return next(req).pipe(
    tap({
      error : (req :HttpResponse<any>) => {
        console.log("fdasfda")
        console.log(req.url)
        if(req.status == HttpStatusCode.Forbidden
        && !req.url?.endsWith("signup")){
          router.navigate([ROUTES.LOGIN])
        }
      }
    }),
  );
}
