import { Component, OnInit } from '@angular/core';
import { ScreenList } from '../../models/ScreenList.model';
import { ColumnList } from '../../models/ColumnList.model';
import { HeaderScreenList } from '../../models/HeaderScreenList.model';
import { Router } from '@angular/router';
import { Agenda } from '../../models/Agenda.model';
import { AgendaService } from '../../services/agenda.service';


@Component({
  selector: 'app-lista-agenda',
  templateUrl: './lista-agenda.component.html',
  styleUrls: ['./lista-agenda.component.css']
})
export class ListaAgendaComponent implements OnInit {

  headerListAgenda: HeaderScreenList = new HeaderScreenList();
  screenListAgenda: ScreenList;
  columnsDate = [];

  columnsList = [new ColumnList("Descrição da Agenda","descricao","string",(element: any) => `${element.descricao}`),
    new ColumnList("Clínica","clinica","string",(element: any) => `${element.nome_clinica}`),
    new ColumnList("Horário Abertura","data_inicio","date",(element: any) => `${element.data_inicio}`),
    new ColumnList("Horário Fechamento","data_fim","date",(element: any) => `${element.data_fim}`),
    new ColumnList("Cadastrado Em","data_cadastro","date",(element: any) => `${element.data_cadastro}`),
    new ColumnList("Status","status","status",(element: any) => `${element.status}`),
    new ColumnList("Ação","acao","acao",(element: any) => `${element.acao}`)
  ];

  constructor(private agendaService: AgendaService,
    private router:Router) { }

  ngOnInit() {

    this.headerListAgenda.placeholderFilter = "Filtro de Agenda";
    this.headerListAgenda.titleBtnAddd = "Adicionar Agenda";
    this.headerListAgenda.titleCard = "Listagem de Agendas";
    this.headerListAgenda.subTitleCard = "Todos as agendas previamente cadastradas serão exibidas abaixo";
    
    this.agendaService.getAgendaFilter();

    this.agendaService.getAgenda().subscribe((data)=>{
      if(data.length || this.agendaService.searchAgenda){
        this.screenListAgenda = new ScreenList();
        this.screenListAgenda.columns = this.columnsList;
        
        data.forEach(element => {
          element['acao'] = "";
        });
        
        this.screenListAgenda.date = data;
      }
    });
  }

  addAgenda(){
    this.router.navigate(['/cadastro/agenda']);
  }
  
  editAgenda(element){
  }

  deleteAgenda(element){
    this.agendaService.delete(element.id);
  }

}
