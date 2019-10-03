import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Conselho } from '../models/Conselho.model';

@Injectable({
  providedIn: 'root'
})
export class ConselhoService {

  private conselhoSubject: BehaviorSubject<Conselho[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getConselhoFilter() {
  
    this.http.get<any>(`${environment.URL_API}/conselho`)
      .subscribe(data => {
        this.conselhoSubject.next(data.conselho);
      });
  }

  getConselho(){
    return this.conselhoSubject;
  }

}
