import { Component, OnInit } from '@angular/core';
import { Especialidade } from '../../models/Especialidade.model';
import { HeaderScreenList } from '../../models/HeaderScreenList.model';
import { ScreenList } from '../../models/ScreenList.model';
import { ColumnList } from '../../models/ColumnList.model';
import { EspecialidadeService } from '../../services/especialidade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-especialidade',
  templateUrl: './lista-especialidade.component.html',
  styleUrls: ['./lista-especialidade.component.css']
})
export class ListaEspecialidadeComponent implements OnInit {

  listEspecialidade: Array<Especialidade> = [];

  headerListEspecialidade: HeaderScreenList = new HeaderScreenList();
  screenListEspecialidade: ScreenList;
  columnsDate = [];

  columnsList = [new ColumnList("Especialidades","descricao","string",(element: any) => `${element.descricao}`),
    new ColumnList("Convênios Aceitos pela Especialidade","especialidade_convenio","string",(element: any) => `${element.especialidade_convenio}`),
    new ColumnList("Ação","acao","acao",(element: any) => `${element.acao}`)
  ];

  constructor(private especialidadeService: EspecialidadeService,
    private router:Router) { }

  ngOnInit() {

    this.headerListEspecialidade.placeholderFilter = "Filtro de Especialidade";
    this.headerListEspecialidade.titleBtnAddd = "Adicionar Especialidade";
    this.headerListEspecialidade.titleCard = "Listagem de Especialidades";
    this.headerListEspecialidade.subTitleCard = "Todos os especialidades previamente cadastrados serão exibidos abaixo";

    this.especialidadeService.getEspecialidadeFilter();
    this.especialidadeService.getEspecialidade().subscribe((data)=>{
      if(data.length || this.especialidadeService.searchEspecialidade){
        this.screenListEspecialidade = new ScreenList();
        this.screenListEspecialidade.columns = this.columnsList;
        
        data.forEach(element => {
          element['acao'] = "";
        });
        
        this.screenListEspecialidade.date = data;
      }
    });
  }

  addEspecialidade(){
    this.router.navigate(['/cadastro/especialidade']);
  }
  
  editEspecialidade(element){
    this.router.navigate([`/cadastro/especialidade/${element.id}`]);
  }

  deleteEspecialidade(element){
    this.especialidadeService.delete(element.id);
  }

}
