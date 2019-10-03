import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { LoadService } from './load.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private agendaSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public searchAgenda: boolean = false;

  constructor(private http: HttpClient,
    private MessageService: MessageService,
    private LoadService: LoadService) { 

  }

  getAgendaFilter(id: number = null) {
    let url = `${environment.URL_API}/agenda`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }
    this.agendaSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchAgenda = true;
        this.agendaSubject.next(data.agenda);
        if(id){
          this.LoadService.hide();
        }
      });
  }

  delete(id: number){
    this.LoadService.show();
    this.http.post(`${environment.URL_API}/agenda/delete`,{agenda:id})
    .subscribe(
      data => {
        this.getAgendaFilter();
        this.MessageService.succMsg(data["mensagem"]);
        this.LoadService.hide();
      }
    );
  }

  getAgenda(){
    return this.agendaSubject;
  }
}
