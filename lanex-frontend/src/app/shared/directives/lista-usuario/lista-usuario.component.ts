import { Component, OnInit } from '@angular/core';
import { HeaderScreenList } from '../../models/HeaderScreenList.model';
import { ScreenList } from '../../models/ScreenList.model';
import { ColumnList } from '../../models/ColumnList.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  headerListUsuario: HeaderScreenList = new HeaderScreenList();
  screenListUsuario: ScreenList;

  columnsList = [new ColumnList("Nome","nome","string",(element: any) => `${element.nome}`),
    new ColumnList("CPF","cpf","string",(element: any) => `${element.cpf}`),
    new ColumnList("Email","email","string",(element: any) => `${element.email}`),
    new ColumnList("Ação","acao","acao",(element: any) => `${element.acao}`)
  ];

  constructor(private router:Router,private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.headerListUsuario.placeholderFilter = "Filtro de Usuário";
    this.headerListUsuario.titleBtnAddd = "Adicionar Usuário";
    this.headerListUsuario.titleCard = "Listagem de Usuário";
    this.headerListUsuario.subTitleCard = "Todos os usuário previamente cadastrados serão exibidos abaixo";

    this.usuarioService.getUsuarioFilter();
    this.usuarioService.getUsuario().subscribe((data)=>{
      if(data.length || this.usuarioService.searchClinica){
        this.screenListUsuario = new ScreenList();
        this.screenListUsuario.columns = this.columnsList;
        
        data.forEach(element => {
          element['acao'] = "";
        });
        
        this.screenListUsuario.date = data;
      }
    });
  }

  addUsuario(){
    this.router.navigate(['/cadastro/usuario']);
  }
  
  editUsuario(element){
    this.router.navigate([`/cadastro/usuario/${element.id}`]);
  }

  deleteUsuario(element){
    this.usuarioService.delete(element.id);
  }

}
