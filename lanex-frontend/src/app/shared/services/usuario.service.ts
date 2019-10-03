import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { LoadService } from './load.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public searchClinica: boolean = false;

  constructor(private http: HttpClient,
    private MessageService: MessageService,
    private LoadService: LoadService) { }

  save(form: FormGroup){

    this.http.post(`${environment.URL_API}/usuario`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  edit(id: number,form: FormGroup){

    this.http.post(`${environment.URL_API}/usuario/${id}`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getUsuarioFilter(id: number = null){
    let url = `${environment.URL_API}/usuario`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }
    this.usuarioSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchClinica = true;
        this.usuarioSubject.next(data.usuario);
        if(id){
          this.LoadService.hide();
        }
      });
  }

  delete(id: number){
    this.LoadService.show();
    this.http.post(`${environment.URL_API}/usuario/delete`,{usuario:id})
    .subscribe(
      data => {
        this.getUsuarioFilter();
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getUsuario(){
    return this.usuarioSubject;
  }
}
