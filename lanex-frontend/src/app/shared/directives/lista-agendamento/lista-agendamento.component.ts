import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../../services/agendamento.service';
import { ScreenList } from '../../models/ScreenList.model';

@Component({
  selector: 'app-lista-agendamento',
  templateUrl: './lista-agendamento.component.html',
  styleUrls: ['./lista-agendamento.component.css']
})
export class ListaAgendamentoComponent implements OnInit {

  screenListAgendamento: ScreenList;


  constructor(
    private agendamentoService: AgendamentoService,
  ) { }

  ngOnInit() {

    this.agendamentoService.getAgendamentoFilter();
    this.agendamentoService.getAgendamento().subscribe((data)=>{
      if(data.length || this.agendamentoService.searchAgendamento){
        this.screenListAgendamento = new ScreenList();
        

        data.forEach(element => {
          element['acao'] = "";
        });
        
        this.screenListAgendamento.date = data;
      }
    });
  }

  getNameUser(){
    let user =  JSON.parse(localStorage.getItem('currentUser'));
    return user.usuario.nome;
  }

  formatarEnderecoClinica(clinica){
    return `${clinica.logradouro}, ${clinica.num_logradouro} - ${clinica.complemento}, ${clinica.cidade} - ${clinica.uf}, ${clinica.cep.substring(0, 5)}-${clinica.cep.substring(5)} ` 
  }

  formatarTelefone(telefone){
    telefone = telefone.toString();
    return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 6)}-${telefone.substring(6)} `
  }

}
