import { Component, OnInit } from '@angular/core';
import { Convenio } from '../../models/Convenio.model';
import { HeaderScreenList } from '../../models/HeaderScreenList.model';
import { ScreenList } from '../../models/ScreenList.model';
import { ColumnList } from '../../models/ColumnList.model';
import { ConvenioService } from '../../services/convenio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-convenio',
  templateUrl: './lista-convenio.component.html',
  styleUrls: ['./lista-convenio.component.css']
})
export class ListaConvenioComponent implements OnInit {

  listConvenio: Array<Convenio> = [];

  headerListConvenio: HeaderScreenList = new HeaderScreenList();
  screenListConvenio: ScreenList;
  columnsDate = [];

  columnsList = [new ColumnList("Convênio","nome","string",(element: any) => `${element.nome}`),
    new ColumnList("Status","status","status",(element: any) => `${element.status}`),
    new ColumnList("Ação","acao","acao",(element: any) => `${element.acao}`)
  ];

  constructor(private convenioService: ConvenioService,
    private router: Router) { }

  ngOnInit() {
    this.headerListConvenio.placeholderFilter = "Filtro de Convênio";
    this.headerListConvenio.titleBtnAddd = "Adicionar Convênio";
    this.headerListConvenio.titleCard = "Listagem de Convênios";
    this.headerListConvenio.subTitleCard = "Todos as convênios previamente cadastradas serão exibidos abaixo";

    this.convenioService.getConvenioFilter();
    this.convenioService.getConvenio().subscribe((data)=>{
      if(data.length || this.convenioService.searchConvenio){
        this.screenListConvenio = new ScreenList();
        this.screenListConvenio.columns = this.columnsList;
        
        data.forEach(element => {
          element['acao'] = "";
        });
        
        this.screenListConvenio.date = data;
      }
    });
  }

  addConvenio(){
    this.router.navigate(['/cadastro/convenio']);
  }
  
  editConvenio(element){
    this.router.navigate([`/cadastro/convenio/${element.id}`]);
  }
  

  deleteConvenio(element){
    this.convenioService.delete(element.id);
  }

}
