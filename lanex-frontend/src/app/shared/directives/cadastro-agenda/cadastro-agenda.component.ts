import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Option } from '../../models/Option.model';
import { ClinicaService } from '../../services/clinica.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import { ProcedimentoService } from '../../services/procedimento.service';
import { MessageService } from '../../services/message.service';
import { LoadService } from '../../services/load.service';
import { AgendaService } from '../../services/agenda.service';
import { Agenda } from '../../models/Agenda.model';

@Component({
  selector: 'app-cadastro-agenda',
  templateUrl: './cadastro-agenda.component.html',
  styleUrls: ['./cadastro-agenda.component.css']
})
export class CadastroAgendaComponent implements OnInit {
  formularioCadastroAgenda: FormGroup;
  actionEdit: boolean = false;
  submitted = false;
  agendaSelected: string;
  agendaObject: Agenda = new Agenda();
  medicoSelect: Option[] = [];
  clinicaSelect: Option[] = [];
  procedimentoSelect: any[] = [];
  diaSelecionado: Option[] = [];
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  hourMask = [/\d/, /\d/, ':', /\d/, /\d/];
  diasHorario = [
    new Option('Domingo',"1"),
    new Option('Segunda',"2"),
    new Option('Terça',"3"),
    new Option('Quarta',"4"),
    new Option('Quinta',"5"),
    new Option('Sexta',"6"),
    new Option('Sábado',"7")
  ];
  optionTipoAgenda = [new Option('É o mesmo',"F"),new Option('Varia de acordo com os dias da semana',"V")];

  constructor(
    private formBuilder: FormBuilder,
    private MessageService: MessageService,
    private LoadService: LoadService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private clinicaService: ClinicaService,
    private medicoService: MedicoService,
    private procedimentoService: ProcedimentoService,
    private agendaService: AgendaService,
  ) { }
  
  
  ngOnInit() {
    this.formularioCadastroAgenda = this.formBuilder.group({
      clinica: ['', [Validators.required]],
      medico: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      data_fim: [''],
      data_inicio: [''],
      observacao: [''],
      procedimentosAgenda: [''],
      diasSelecionados: [],
      tipoAgenda:['V',[Validators.required]]
    });

    //CARREGAMENTO DE CLINICAS
    this.clinicaService.getClinicaFilter();
    this.clinicaService.getClinica().subscribe((data)=>{
      
      if(data.length > 0){
        data.forEach(element => {
          this.clinicaSelect.push(new Option(element.nome,element.id));
        });
      }
    });

    //CARREGAMENTO DE MEDICOS
    this.medicoService.getMedicoFilter();
    this.medicoService.getMedico().subscribe((data)=>{
      
      if(data.length > 0){
        data.forEach(element => {
          this.medicoSelect.push(new Option(element.nome,element.id));
        });
      }
    });

    //CARREGAMENTO DE PROCEDIMENTOS
    this.procedimentoService.getProcedimentoFilter();
    this.procedimentoService.getProcedimento().subscribe((data)=>{
      if(data.length > 0){
        data.forEach(element => {
          this.procedimentoSelect.push(new Option(element.descricao,element.id));
        });
      } 
    });

    if(this.routerActive.snapshot.paramMap.get('id')){
      this.agendaSelected = this.routerActive.snapshot.paramMap.get('id');
      this.agendaService.getAgendaFilter(Number(this.agendaSelected));
      this.clinicaService.getClinica().subscribe((data)=>{
        if(data.length){
          this.agendaObject = data[0];
        }
      });
    }
  }

  voltar() {
    this.router.navigate(["/agenda"]);
  }

  selecionaDiasAtendimento(event){
    
    if(this.diaSelecionado.find(x => x.value == event.source.value)){
      let index = this.diaSelecionado.findIndex(x => x.value == event.source.value);
      this.diaSelecionado.splice(index,1);
    }else{
      this.diaSelecionado.push(this.diasHorario.find(x => x.value == event.source.value));
    }
    this.sortDiasSelecionados();
  }

  selectedAgenda(option){
    this.formularioCadastroAgenda.controls.tipoAgenda.setValue(option.value);
  }

  sortDiasSelecionados(){
    this.diaSelecionado.sort(function(a, b) {
      if (Number(a.value) < Number(b.value))
        return -1;
      if (Number(a.value) > Number(b.value))
        return 1;
      return 0;
    });    
  }

  onSubmit(){
    this.submitted = true;
    this.LoadService.show();
    if(this.formularioCadastroAgenda.invalid){
      this.LoadService.hide();
      this.diplayErros();
      this.MessageService.errorMsg("Preencher os dados corretamente")
      return;
    }
    if(this.actionEdit){
      this.clinicaService.edit(Number(this.agendaObject.id),this.formularioCadastroAgenda);
    }else{
      this.clinicaService.save(this.formularioCadastroAgenda);
    }
  }

  diplayErros(){
    let controls = this.formularioCadastroAgenda.controls;
    for(let control in controls){
      if(controls[control].invalid){
        controls[control].markAsTouched();
      }
    }
  }
}
