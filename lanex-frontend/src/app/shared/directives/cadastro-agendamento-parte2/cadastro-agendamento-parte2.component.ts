import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-agendamento-parte2',
  templateUrl: './cadastro-agendamento-parte2.component.html',
  styleUrls: ['./cadastro-agendamento-parte2.component.css']
})
export class CadastroAgendamentoParte2Component implements OnInit {


  listaClinica = [
    { name: 'ImageMais', id: '1', vagas: '5', value: '233,00' },
    { name: 'Clínica B', id: '2', vagas: '5', value: '230,00' },
    { name: 'Clínica C', id: '2', vagas: '5', value: '233,00' },
  ];

  listaMedico = [
    {name : "Medico1", id : "1", crm : "12345", horario : ["15:15", "15:50", "17:00", "17:30", "17:45"]},
    {name : "Medico2", id : "2", crm : "12344", horario : ["15:15", "15:50", "17:00", "17:30", "17:45"]},
    {name : "Medico3", id : "3", crm : "12343", horario : ["15:15", "15:50", "17:00", "17:30", "17:45"]}
  ]

  objAddAgendamento: any = {};
  turno: string = "manha";
  horario: string = "";

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();

    if (nav != null) {
      this.objAddAgendamento = nav.extras.state.obj;
    } else {
      this.objAddAgendamento = null;
    }
  }

  ngOnInit() {
    if (this.objAddAgendamento == null) {
      this.router.navigate(["/agendamento/cadastro"]);
      location.reload(true);
      
    }
  }
  
  proximaEtapa(medico, horario){
    
    this.objAddAgendamento.medico = medico;
    this.objAddAgendamento.horario = horario;

    this.router.navigateByUrl('/agendamento/cadastro/parte3', {
      state: { obj: this.objAddAgendamento }
    })
  }

}
