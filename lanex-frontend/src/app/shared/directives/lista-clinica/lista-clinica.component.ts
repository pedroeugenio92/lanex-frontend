import { Component, OnInit } from '@angular/core';
import { ScreenList } from '../../models/ScreenList.model';
import { ColumnList } from '../../models/ColumnList.model';
import { HeaderScreenList } from '../../models/HeaderScreenList.model';
import { Router } from '@angular/router';
import { Clinica } from '../../models/Clinica.model';
import { ClinicaService } from '../../services/clinica.service';

@Component({
  selector: 'app-lista-clinica',
  templateUrl: './lista-clinica.component.html',
  styleUrls: ['./lista-clinica.component.css']
})
export class ListaClinicaComponent implements OnInit {

  listClinica: Array<Clinica> = [];

  headerListClinica: HeaderScreenList = new HeaderScreenList();
  screenListClinica: ScreenList;
  columnsDate = [];

  columnsList = [new ColumnList("Clínica","nome","string",(element: any) => `${element.nome}`),
    new ColumnList("CNPJ","cnpj","string",(element: any) => `${element.cnpj}`),
    new ColumnList("Status","status","status",(element: any) => `${element.status}`),
    new ColumnList("Ação","acao","acao",(element: any) => `${element.acao}`)
  ];

  constructor(private clinicaService: ClinicaService,
    private router:Router) { }

  ngOnInit() {
    this.headerListClinica.placeholderFilter = "Filtro de Clínica";
    this.headerListClinica.titleBtnAddd = "Adicionar Clínica";
    this.headerListClinica.titleCard = "Listagem de Clínicas";
    this.headerListClinica.subTitleCard = "Todos as clínicas previamente cadastradas serão exibidos abaixo";

    this.clinicaService.getClinicaFilter();
    this.clinicaService.getClinica().subscribe((data)=>{
      if(data.length || this.clinicaService.searchClinica){
        this.screenListClinica = new ScreenList();
        this.screenListClinica.columns = this.columnsList;
        
        data.forEach(element => {
          element['acao'] = "";
        });
        
        this.screenListClinica.date = data;
      }
    });
  }

  addClinica(){
    this.router.navigate(['/cadastro/clinica']);
  }
  
  editClinica(element){
    this.router.navigate([`/cadastro/clinica/${element.id}`]);
  }

  deleteClinica(element){
    this.clinicaService.delete(element.id);
  }

}
