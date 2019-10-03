import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadService } from './load.service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private agendamentoSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public searchAgendamento: boolean = false;


  constructor(private http: HttpClient,
    private LoadService: LoadService) { 

  }

  getAgendamentoFilter(id: number = null) {
    let url = `${environment.URL_API}/agendamento`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }
    this.agendamentoSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchAgendamento = true;
        this.agendamentoSubject.next(data.agendamento);
        if(id){
          this.LoadService.hide();
        }
      });
  }

  getAgendamento(){
    return this.agendamentoSubject;
  }

}
