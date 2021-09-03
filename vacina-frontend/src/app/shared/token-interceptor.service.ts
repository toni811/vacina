import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {

                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',

                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return next.handle(request);
    }
}

