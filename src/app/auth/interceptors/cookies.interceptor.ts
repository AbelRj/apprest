import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class CookiesInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Verificar si localStorage está definido antes de acceder al token
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token')?.toString();
      console.log(token);

      if (token) {
        req = req.clone({
          headers: req.headers.set('token', token),
        });
      }
    }

    return next.handle(req).pipe(
      catchError(this.handlerError)
    );
  }

  handlerError(error: HttpErrorResponse) {
    switch (error.status) {
        case 400:
          alert('Contraseña incorrecta');
          break;
        case 401:
          alert('Credenciales no válidas');
          break;
        case 403:
          alert('Acceso no autorizado');
          break;
        case 404:
          alert('Usuario no encontrado');
          break;
        case 452:
          alert('Usuario o contraseña incorrectos');
          break;
        case 500:
          alert('Error interno del servidor');
          break;
        default:
          alert('Error desconocido');
          break;
    }
    return throwError(error);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CookiesInterceptor,
  multi: true,
};
