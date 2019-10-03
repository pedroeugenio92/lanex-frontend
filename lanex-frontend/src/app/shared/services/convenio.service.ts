import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Convenio } from '../models/Convenio.model';
import { MessageService } from './message.service';
import { LoadService } from './load.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  private convenioSubject: BehaviorSubject<Convenio[]> = new BehaviorSubject([]);
  public searchConvenio: boolean = false;

  constructor(private http: HttpClient,
    private MessageService: MessageService,
    private LoadService: LoadService) { 

  }

  getConvenioFilter(id: number = null) {
    let url = `${environment.URL_API}/convenio`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }

    this.convenioSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchConvenio = true;
        this.convenioSubject.next(data.convenio);
        if(id){
          this.LoadService.hide();
        }
      });
  }

  save(form: FormGroup){

    this.http.post(`${environment.URL_API}/convenio`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  edit(id: number,form: FormGroup){

    this.http.post(`${environment.URL_API}/convenio/${id}`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  delete(id: number){
    this.LoadService.show();
    this.http.post(`${environment.URL_API}/convenio/delete`,{convenio:id})
    .subscribe(
      data => {
        this.getConvenioFilter();
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getConvenio(){
    return this.convenioSubject;
  }
}
