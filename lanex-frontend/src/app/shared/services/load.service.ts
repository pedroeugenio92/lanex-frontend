import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { LoadModel } from '../models/Load.model';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  private loaderSubject = new Subject<LoadModel>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(<LoadModel>{ show: true });
  }
  hide() {
    this.loaderSubject.next(<LoadModel>{ show: false });
  }
  isLoading(){
    return this.loaderState;
  }
}
