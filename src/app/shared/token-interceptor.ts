import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    protected TOKEN = 'TOKEN';

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        var token = localStorage.getItem(this.TOKEN);
        if (!!token)
        {
            request = request.clone({
                setHeaders: {
                    'Authorization': localStorage.getItem(this.TOKEN)
                }
            });
        }

        return next.handle(request);
    }
}
