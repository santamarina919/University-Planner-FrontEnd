import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from './EndPoints';

export function baseUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const reqClone = req.clone({url : BASE_URL + req.url,credentials : 'include'})
  return next(reqClone);
}
