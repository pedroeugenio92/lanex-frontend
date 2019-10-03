import { Component, OnInit } from '@angular/core';
import { ScreenList } from '../../models/ScreenList.model';
import { ColumnList } from '../../models/ColumnList.model';
import { HeaderScreenList } from '../../models/HeaderScreenList.model';
import { Router } from '@angular/router';
import { Procedimento } from '../../models/Procedimento.model';
import { ProcedimentoService } from '../../services/procedimento.service';

@Component({
  selector: 'app-lista-procedimento',
  templateUrl: './lista-procedimento.component.html',
  styleUrls: ['./lista-procedimento.component.css']
})
export class ListaProcedimentoComponent implements OnInit {

  listProcedimento: Array<Procedimento> = [];

  headerListProcedimento: HeaderScreenList = new HeaderScreenList();
  screenListProcedimento: ScreenList;
  columnsDate = [];

  columnsList = [new ColumnList("Procedimento","descricao","string",(element: any) => `${element.descricao}`),
    new ColumnList("Tipo Procedimento","tipo_procedimento","string",(element: any) => `${element.descricao_tipo_procedimento}`),
    new ColumnList("Data Cadastro","data_cadastro","date",(element: any) => `${element.data_cadastro}`),
    new ColumnList("Ação","acao","acao",(element: any) => `${element.acao}`)
  ];

  constructor(private procedimentoService: ProcedimentoService,
    private router:Router) { }

  ngOnInit() {
    this.headerListProcedimento.placeholderFilter = "Filtro de Procedimento";
    this.headerListProcedimento.titleBtnAddd = "Adicionar Procedimento";
    this.headerListProcedimento.titleCard = "Listagem de Procedimentos";
    this.headerListProcedimento.subTitleCard = "Todos os procedimentos previamente cadastrados serão exibidos abaixo";
    
    this.procedimentoService.getProcedimentoFilter();
    this.procedimentoService.getProcedimento().subscribe((data)=>{
      if(data.length || this.procedimentoService.searchProcedimento){
        this.screenListProcedimento = new ScreenList();
        this.screenListProcedimento.columns = this.columnsList;
        
        data.forEach(element => {
          element['acao'] = "";
        });
        
        this.screenListProcedimento.date = data;
      }
    });
  }

  searchColumnsDate(){
    this.columnsList.forEach((element,index) => {
      if(element.type == 'date'){
        this.columnsDate.push(index);
      }
    });
  }

  addProcedimento(){
    this.router.navigate(['/cadastro/procedimento']);
  }
  
  editProcedimento(element){
    this.router.navigate([`/cadastro/procedimento/${element.id}`]);
  }

  deleteProcedimento(element){
    this.procedimentoService.delete(element.id);
  }

}
