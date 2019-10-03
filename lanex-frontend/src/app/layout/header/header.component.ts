import { Component, OnInit,ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Menu } from 'src/app/shared/models/Menu.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  environment: any;
  currentUserSubscription: Subscription;

  menus = [new Menu("menuAgendamento","Agendamentos",null,"",[new Menu("Médico","Médico",null,"/cadastromedico")])];

  menusAnterior = [];

  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.environment = environment;
  }

  selecionarMenu(rota){
    this.router.navigate([rota]);
  }

  logout(){
    this.authenticationService.logout();
    //location.reload(true);
    this.router.navigate(["/login"]);
  }

}
