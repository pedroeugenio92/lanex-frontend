import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { LoadService } from './load.service';
import { BehaviorSubject } from 'rxjs';
import { Medico } from '../models/Medico.model';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private medicoSubject: BehaviorSubject<Medico[]> = new BehaviorSubject([]);
  public searchMedico: boolean = false;

  constructor(private http: HttpClient,
    private MessageService: MessageService,
    private LoadService: LoadService) { 
  
  }

  save(form: FormGroup){

    this.http.post(`${environment.URL_API}/medico`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  edit(id: number,form: FormGroup){

    this.http.post(`${environment.URL_API}/medico/${id}`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  delete(id: number){
    this.LoadService.show();
    this.http.post(`${environment.URL_API}/medico/delete`,{medico:id})
    .subscribe(
      data => {
        this.getMedicoFilter();
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getMedicoFilter(id: number = null){
    let url = `${environment.URL_API}/medico`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }

    this.medicoSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchMedico = true;
        this.medicoSubject.next(data.medico);
        if(id){
          this.LoadService.hide();
        }
    });
  }

  getMedico(){
    return this.medicoSubject.asObservable();
  }

  setSearchMedico(search: boolean){
    this.searchMedico = search;
  }
}
