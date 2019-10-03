import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { Usuario } from './shared/models/Usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;
  currentUserSubscription: Subscription;
  users: Usuario[] = [];

  constructor(
      private authenticationService: AuthenticationService
      
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      
      this.currentUser = user;
    });
  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }
}
