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
export class ClinicaService {

  private clinicaSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public searchClinica: boolean = false;

  constructor(private http: HttpClient,
    private MessageService: MessageService,
    private LoadService: LoadService) { 

  }

  save(form: FormGroup){

    this.http.post(`${environment.URL_API}/clinica`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  edit(id: number,form: FormGroup){

    this.http.post(`${environment.URL_API}/clinica/${id}`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getClinicaFilter(id: number = null){
    let url = `${environment.URL_API}/clinica`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }
    this.clinicaSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchClinica = true;
        this.clinicaSubject.next(data.clinica);
        if(id){
          this.LoadService.hide();
        }
      });
  }

  delete(id: number){
    this.LoadService.show();
    this.http.post(`${environment.URL_API}/clinica/delete`,{clinica:id})
    .subscribe(
      data => {
        this.getClinicaFilter();
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getClinica(){
    return this.clinicaSubject;
  }
}
