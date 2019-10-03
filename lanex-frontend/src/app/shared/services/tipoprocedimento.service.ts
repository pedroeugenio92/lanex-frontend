import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { LoadService } from './load.service';;

@Injectable({
  providedIn: 'root'
})
export class TipoProcedimentoService {
  private tipoprocedimentoSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public searchEspecialidade: boolean = false;

  constructor(private http: HttpClient,
    private MessageService: MessageService,
    private LoadService: LoadService) { 

  }

  getTipoProcedimentoFilter(id: number = null) {
    let url = `${environment.URL_API}/tipoprocedimento`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }

    this.tipoprocedimentoSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchEspecialidade = true;
        this.tipoprocedimentoSubject.next(data.tipo_procedimento);
        if(id){
          this.LoadService.hide();
        }
      });
  }

  getTipoProcedimento(){
    return this.tipoprocedimentoSubject;
  }
}
