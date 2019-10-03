import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private cidadeSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  getCidadeFilter(id: number = null){
    let url = `${environment.URL_API}/cidade`;
    if(id){
      url += `/${id}`;
    }
    this.cidadeSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.cidadeSubject.next(data.cidade);

      });
  }
  getCidadeByEstado(id_estado) {

    this.cidadeSubject.next([]);
    this.http.post<any>(`${environment.URL_API}/cidade`,{estado:id_estado})
      .subscribe(data => {
        this.cidadeSubject.next(data.cidade);
      });
  }

  getCidade(){
    return this.cidadeSubject;
  }
}
