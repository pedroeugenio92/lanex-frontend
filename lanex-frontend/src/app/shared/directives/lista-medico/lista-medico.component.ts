import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/Medico.model';
import { ScreenList } from '../../models/ScreenList.model';
import { ColumnList } from '../../models/ColumnList.model';
import { HeaderScreenList } from '../../models/HeaderScreenList.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-medico',
  templateUrl: './lista-medico.component.html',
  styleUrls: ['./lista-medico.component.css']
})
export class ListaMedicoComponent implements OnInit {

  listMedico: Array<Medico> = [];

  headerListMedico: HeaderScreenList = new HeaderScreenList();
  screenListMedico: ScreenList ;

  columnsList = [new ColumnList("Nome","nome","string",(element: any) => `${element.nome}`),
    new ColumnList("CPF","cpf","string",(element: any) => `${element.cpf}`),
    new ColumnList("Data Nascimento","datanascimento","date",(element: any) => `${element.data_nascimento}`),
    new ColumnList("Ação","acao","acao",(element: any) => `${element.acao}`)
  ];


  constructor(private medicoService: MedicoService,
    private router: Router) { 

  }

  ngOnInit() {

    this.headerListMedico.placeholderFilter = "Filtro de médico";
    this.headerListMedico.titleBtnAddd = "Adicionar Médico";
    this.headerListMedico.titleCard = "Listagem de Médicos";
    this.headerListMedico.subTitleCard = "Todos os médicos previamente cadastrados serão exibidos abaixo";

    this.medicoService.getMedicoFilter();
    this.medicoService.getMedico().subscribe((data)=>{
      if(data.length || this.medicoService.searchMedico){
        this.screenListMedico =  new ScreenList();
        this.screenListMedico.columns = this.columnsList;
        data.forEach(element => {
          element['acao'] = "";
        });
        this.screenListMedico.date = data;
        this.medicoService.setSearchMedico(false);
      }
    });
  }

  addMedico(){
    this.router.navigate(['/cadastro/medico']);
  }
  
  editMedico(element){
    this.router.navigate([`/cadastro/medico/${element.id}`]);
  }

  deleteMedico(element){
    this.medicoService.delete(element.id);
    this.medicoService.getMedico().subscribe((data)=>{
      if(data.length || this.medicoService.searchMedico){
        this.screenListMedico.columns = this.columnsList;
        data.forEach(element => {
          element['acao'] = "";
        });
        this.screenListMedico.date = data;
        this.medicoService.setSearchMedico(false);
      }
    });
  }
}
