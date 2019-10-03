import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Procedimento } from '../models/Procedimento.model';
import { MessageService } from './message.service';
import { LoadService } from './load.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {

  private procedimentoSubject: BehaviorSubject<Procedimento[]> = new BehaviorSubject([]);
  public searchProcedimento: boolean = false;

  constructor(private http: HttpClient,
    private MessageService: MessageService,
    private LoadService: LoadService) { 

  }

  save(form: FormGroup){

    this.http.post(`${environment.URL_API}/procedimento`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  edit(id: number,form: FormGroup){

    this.http.post(`${environment.URL_API}/procedimento/${id}`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getProcedimentoFilter(id: number = null) {
    let url = `${environment.URL_API}/procedimento`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }

    this.procedimentoSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchProcedimento = true;
        this.procedimentoSubject.next(data.procedimento);
        if(id){
          this.LoadService.hide();
        }
      });
  }

  delete(id: number){
    this.LoadService.show();
    this.http.post(`${environment.URL_API}/procedimento/delete`,{procedimento:id})
    .subscribe(
      data => {
        this.getProcedimentoFilter();
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getProcedimento(){
    return this.procedimentoSubject;
  }

  setSearchProcedimento(search: boolean){
    this.searchProcedimento = search;
  }
}
