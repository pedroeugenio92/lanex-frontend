
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { RouterModule } from '@angular/router';
import { Services } from './services/';
import { Directives } from './directives/';

import { TextMaskModule } from 'angular2-text-mask';
import { LayoutModule } from '@angular/cdk/layout';
import { ModalDeleteComponent } from './directives/list/modal-delete/modal-delete.component';
import { ListaUsuarioComponent } from './directives/lista-usuario/lista-usuario.component';
import { CadastroUsuarioComponent } from './directives/cadastro-usuario/cadastro-usuario.component';

@NgModule({
  declarations: [
    ...Directives,
    ListaUsuarioComponent,
    CadastroUsuarioComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule,
    LayoutModule
  ],
  entryComponents:[
    ModalDeleteComponent
  ],

  providers: [
    ...Services,
    DatePipe
  ],
  exports: [
    ...Directives,
    MaterialModule

  ]


})
export class SharedModule { }
