import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  currentUser: any;
  environment: any;
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.environment = environment;
    this.currentUser = this.authenticationService.currentUserValue.usuario;
    
  }

  selecionarMenu(rota){
    this.router.navigate([rota]);
  }

}
