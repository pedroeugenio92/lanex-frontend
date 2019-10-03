import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {
  planosArray: any[] = ["Plano 1", "Plano 2", "Plano 3"];
  constructor() { }

  ngOnInit() {
  }

}
