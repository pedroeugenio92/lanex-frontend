import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { MessageService } from '../shared/services/message.service';
import { LoadService } from '../shared/services/load.service';
import { Router } from '@angular/router';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private messageService: MessageService,
        private router: Router,
        private LoadService: LoadService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.LoadService.hide();
            if (err.status === 401 || err.status == 403) {
                // auto logout if 401 response returned from api
                this.messageService.errorMsg("Você não possui autorização para acessar o sistema");
                this.authenticationService.logout();
                location.reload(true);
                //this.router.navigate(["/"]);
            }else if (err.status === 500){
                let mensagem = "Não foi possível conectar ao servidor, tente mais tarde!";
                if(err.error.mensagem){
                    mensagem = err.error.mensagem;
                }
                this.messageService.warnMsg(mensagem);
            }else{
                let mensagem = "Não foi possível conectar ao servidor, tente mais tarde!";
                this.messageService.errorMsg(mensagem);
            }
            return throwError(err.error.mensagem);
        }))
    }
}