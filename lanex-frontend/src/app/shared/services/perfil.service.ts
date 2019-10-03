import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private perfilSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  getPerfilFilter() {
  
    this.http.get<any>(`${environment.URL_API}/perfil`)
      .subscribe(data => {
        this.perfilSubject.next(data.perfil);
      });
  }

  getPerfil(){
    return this.perfilSubject;
  }
}
