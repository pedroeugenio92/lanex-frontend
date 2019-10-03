import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private estadoSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  getEstadoFilter() {
  
    this.http.get<any>(`${environment.URL_API}/estado`)
      .subscribe(data => {
        this.estadoSubject.next(data.estado);
      });
  }

  getEstado(){
    return this.estadoSubject;
  }
}
