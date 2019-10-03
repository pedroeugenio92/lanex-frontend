import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { LoadService } from './load.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  private especialidadeSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public searchEspecialidade: boolean = false;

  constructor(private http: HttpClient,
    private MessageService: MessageService,
    private LoadService: LoadService) { }

  getEspecialidadeFilter(id: number = null) {
    let url = `${environment.URL_API}/especialidade`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }

    this.especialidadeSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchEspecialidade = true;
        this.especialidadeSubject.next(data.especialidade);
        if(id){
          this.LoadService.hide();
        }
      });
  }

  save(form: FormGroup){

    this.http.post(`${environment.URL_API}/especialidade`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  edit(id: number,form: FormGroup){

    this.http.post(`${environment.URL_API}/especialidade/${id}`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  delete(id: number){
    this.LoadService.show();
    this.http.post(`${environment.URL_API}/especialidade/delete`,{especialidade:id})
    .subscribe(
      data => {
        this.getEspecialidadeFilter();
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getEspecialidade(){
    return this.especialidadeSubject;
  }
}
