import { CadastroConvenioComponent } from './shared/directives/cadastro-convenio/cadastro-convenio.component';
import { CadastroEspecialidadesComponent } from './shared/directives/cadastro-especialidades/cadastro-especialidades.component';
import { CadastroProcedimentoComponent } from './shared/directives/cadastro-procedimento/cadastro-procedimento.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { CadastroComponent } from './shared/directives/cadastro/cadastro.component';
import { AppComponent } from './app.component';
import { CadastroMedicoComponent } from './shared/directives/cadastro-medico/cadastro-medico.component';
import { CadastroAgendaComponent } from './shared/directives/cadastro-agenda/cadastro-agenda.component';
import { ListaMedicoComponent } from './shared/directives/lista-medico/lista-medico.component';
import { ListaProcedimentoComponent } from './shared/directives/lista-procedimento/lista-procedimento.component';
import { ListaClinicaComponent } from './shared/directives/lista-clinica/lista-clinica.component';
import { ListaConvenioComponent } from './shared/directives/lista-convenio/lista-convenio.component';
import { ListaEspecialidadeComponent } from './shared/directives/lista-especialidade/lista-especialidade.component';
import { ListaAgendaComponent } from './shared/directives/lista-agenda/lista-agenda.component';
import { CadastroPacienteComponent } from './shared/directives/cadastro-paciente/cadastro-paciente.component';
import { CadastroClinicaComponent } from './shared/directives/cadastro-clinica/cadastro-clinica.component';
import { HomeComponent } from './shared/directives/home/home.component';
import { ListaAgendamentoComponent } from './shared/directives/lista-agendamento/lista-agendamento.component';
import { CadastroAgendamentoComponent } from './shared/directives/cadastro-agendamento/cadastro-agendamento.component';
import { CadastroAgendamentoParte2Component } from './shared/directives/cadastro-agendamento-parte2/cadastro-agendamento-parte2.component';
import { CadastroAgendamentoParte3Component } from './shared/directives/cadastro-agendamento-parte3/cadastro-agendamento-parte3.component';
import { CadastroAgendamentoConfirmacaoComponent } from './shared/directives/cadastro-agendamento-confirmacao/cadastro-agendamento-confirmacao.component';
import { ListaUsuarioComponent } from './shared/directives/lista-usuario/lista-usuario.component';
import { CadastroUsuarioComponent } from './shared/directives/cadastro-usuario/cadastro-usuario.component';
const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
      },
      {
        path: 'cadastro/medico',
        component: CadastroMedicoComponent
      },
      {
        path: 'cadastro/medico/:id',
        component: CadastroMedicoComponent
      },
      {
        path: 'cadastro/agenda',
        component: CadastroAgendaComponent
      },
      {
        path: 'cadastro/especialidade',
        component: CadastroEspecialidadesComponent
      },
      {
        path: 'cadastro/especialidade/:id',
        component: CadastroEspecialidadesComponent
      },
      {
        path: 'cadastro/convenio',
        component: CadastroConvenioComponent
      },
      {
        path: 'cadastro/convenio/:id',
        component: CadastroConvenioComponent
      },
      {
        path: 'cadastro/clinica',
        component: CadastroClinicaComponent
      },
      {
        path: 'cadastro/clinica/:id',
        component: CadastroClinicaComponent
      },
      {
        path: 'cadastro/procedimento',
        component: CadastroProcedimentoComponent
      },
      {
        path: 'cadastro/procedimento/:id',
        component: CadastroProcedimentoComponent
      },
      {
        path: 'cadastro/agendamento/',
        component: CadastroProcedimentoComponent
      },
      {
        path: 'procedimento',
        component: ListaProcedimentoComponent
      },
      {
        path: 'medico',
        component: ListaMedicoComponent
      },
      {
        path: 'clinica',
        component: ListaClinicaComponent
      },
      {
        path: 'convenio',
        component: ListaConvenioComponent
      },
      {
        path: 'especialidade',
        component: ListaEspecialidadeComponent
      },
      {
        path: 'usuario',
        component: ListaUsuarioComponent
      },
      {
        path: 'agenda',
        component: ListaAgendaComponent
      },
      {
        path: 'cadastro/usuario',
        component: CadastroUsuarioComponent
      },
      {
        path: 'cadastro/usuario/:id',
        component: CadastroUsuarioComponent
      },
      //Wagner
      {
        path: 'agendamento',
        component: ListaAgendamentoComponent
      },
      {
        path: 'agendamento/cadastro',
        component: CadastroAgendamentoComponent
      },
      {
        path: 'agendamento/cadastro/parte2',
        component: CadastroAgendamentoParte2Component
      },
      {
        path: 'agendamento/cadastro/parte3',
        component: CadastroAgendamentoParte3Component
      },
      {
        path: 'agendamento/cadastro/confirmacao',
        component: CadastroAgendamentoConfirmacaoComponent
      },

    ]
  },
  { path: 'login', 
    component: LoginComponent 
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
