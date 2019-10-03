import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from '../../models/Option.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadService } from '../../services/load.service';
import { TipoProcedimentoService } from '../../services/tipoprocedimento.service';
import { EspecialidadeService } from '../../services/especialidade.service';
import { ProcedimentoService } from '../../services/procedimento.service';
import { MedicoService } from '../../services/medico.service';
import { MessageService } from '../../services/message.service';
import { Procedimento } from '../../models/Procedimento.model';

@Component({
  selector: 'app-cadastro-procedimento',
  templateUrl: './cadastro-procedimento.component.html',
  styleUrls: ['./cadastro-procedimento.component.css']
})
export class CadastroProcedimentoComponent implements OnInit {

  formularioCadastroProcedimento: FormGroup;
  tipoProcedimentoSelect: Option[] = [];;
  especialidadeSelect: Option[] = [];
  medicoSelect: Option[] = [];
  procedimentoObject: Procedimento = new Procedimento();
  procedimentoSelected: string;
  submitted = false;
  actionEdit: boolean = false;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tipoprocedimentoService: TipoProcedimentoService,
    private especialidadeService: EspecialidadeService,
    private medicoService: MedicoService,
    private procedimentoService: ProcedimentoService,
    private MessageService: MessageService,
    private LoadService: LoadService,
    private routerActive: ActivatedRoute
  ) { }

  ngOnInit() {

    this.formularioCadastroProcedimento = this.formBuilder.group({
      descricao: [null, [Validators.required, Validators.maxLength(250)]],
      valor: ['', [Validators.required]],
      status: [true, [Validators.required]],
      tipo_procedimento: ['', [Validators.required]],
      retorno: [false, [Validators.required]],
      dias_retorno: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      restricao_especialidade: ['', [Validators.required]],
      restricao_medico: ['', [Validators.required]],
      
    });

    if(this.routerActive.snapshot.paramMap.get('id')){
      this.actionEdit = true;
      this.procedimentoSelected = this.routerActive.snapshot.paramMap.get('id');
      this.procedimentoService.getProcedimentoFilter(Number(this.procedimentoSelected));
      this.procedimentoService.getProcedimento().subscribe((data)=>{
        if(data.length){
          this.procedimentoObject = data[0];
          this.formularioCadastroProcedimento.setValue({
            descricao: this.procedimentoObject.descricao,
            valor: this.procedimentoObject.valor,
            status: this.procedimentoObject.status,
            tipo_procedimento: this.procedimentoObject.id_tipo_procedimento,
            retorno: this.procedimentoObject.retorno,
            dias_retorno: this.procedimentoObject.dias_retorno,
            observacao: this.procedimentoObject.observacao,
            restricao_especialidade: this.procedimentoObject.restricao_especialidade,
            restricao_medico: this.procedimentoObject.restricao_medico,
            
          });

        }

      });
    }

    //CARREGAMENTO DOS TIPOS DE PROCEDIMENTO
    this.tipoprocedimentoService.getTipoProcedimentoFilter();
    this.tipoprocedimentoService.getTipoProcedimento().subscribe((data)=>{
      if(data.length > 0){
        data.forEach(element => {
          this.tipoProcedimentoSelect.push(new Option(element.descricao,element.id));
        });
      }
    });

    //CARREGAMENTO DE ESPECIALIDADES
    this.especialidadeService.getEspecialidadeFilter();
    this.especialidadeService.getEspecialidade().subscribe((data)=>{
      if(data.length > 0){
        data.forEach(element => {
          this.especialidadeSelect.push(new Option(element.descricao,element.id));
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
  }

  onSubmit() {
    
    this.submitted = true;
    this.LoadService.show();
    if(this.formularioCadastroProcedimento.invalid){
      this.LoadService.hide();
      this.diplayErros();
      this.MessageService.errorMsg("Preencher os dados corretamente")
      return;
    }

    if(this.actionEdit){
      this.procedimentoService.edit(Number(this.procedimentoObject.id),this.formularioCadastroProcedimento);
    }else{
      this.procedimentoService.save(this.formularioCadastroProcedimento);
    }
    
  }

  voltar(){
    this.router.navigate(["/procedimento"]);
  }

  diplayErros(){
    let controls = this.formularioCadastroProcedimento.controls;
    for(let control in controls){
      if(controls[control].invalid){
        controls[control].markAsTouched();
      }
    }
  }

}
