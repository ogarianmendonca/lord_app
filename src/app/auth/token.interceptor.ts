import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
/**
 * Inclui o token nas chamadas das APIs
 */
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrl: Array<any> = request.url.split('/');
        const apiUrlBase: Array<any> = environment.api_url.split('/');
        const token = localStorage.getItem('token');

        if (token && (requestUrl[2] === apiUrlBase[2])) {
            const newRequest = request.clone(
                {
                    setHeaders: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            );

            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }
    }
}
