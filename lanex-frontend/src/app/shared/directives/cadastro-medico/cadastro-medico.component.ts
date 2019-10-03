import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConselhoService } from '../../services/conselho.service';
import { Option } from '../../models/Option.model';
import { EstadoService } from '../../services/estado.service';
import { EspecialidadeService } from '../../services/especialidade.service';
import { ConvenioService } from '../../services/convenio.service';
import { ProcedimentoService } from '../../services/procedimento.service';
import { MedicoService } from '../../services/medico.service';
import { MessageService } from '../../services/message.service';
import { LoadService } from '../../services/load.service';
import { Medico } from '../../models/Medico.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastro-medico',
  templateUrl: './cadastro-medico.component.html',
  styleUrls: ['./cadastro-medico.component.css']
})
export class CadastroMedicoComponent implements OnInit {
  formularioCadastroMedico: FormGroup;
  conselhoSelect: Option[] = [];
  estadoSelect: Option[] = [];
  especialidadeSelect: Option[] = [];
  sexoArray: Option[] = [new Option("Masculino","M"),new Option("Feminino","F")];
  convenioSelect: Option[] = [];
  procedimentoSelect: any[] = [];
  orgaos: any[] = ['SDS', 'SSP'];
  medicoSelected: string;
  medicoObject: Medico = new Medico();
  actionEdit: boolean = false;
  submitted = false;

  regexCpf = '([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})';
  regexTelefoneCelular = '(\(\d{2}\)\s)?(\d{4,5}\-,\d{4})/';
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/ , '-', /\d/,/\d/];
  telefoneMask = ['(', /\d/, /\d/, ')', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private conselhoService: ConselhoService,
    private estadoService: EstadoService,
    private especialidadeService: EspecialidadeService,
    private convenioService: ConvenioService,
    private procedimentoService: ProcedimentoService,
    private medicoService: MedicoService,
    private MessageService: MessageService,
    private LoadService: LoadService,
    private routerActive: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {

    this.formularioCadastroMedico = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(250)]],
      conselho: ['', [Validators.required]],
      registro: ['', [Validators.required, Validators.maxLength(10)]],
      ufMedico: ['', [Validators.required]],
      cpf: ['', [Validators.pattern(this.regexCpf), Validators.required]],
      especialidades: ['', [Validators.required]],
      telefone: ['', [Validators.required,Validators.maxLength(15)]],
      dataDeNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      funcao: ['', Validators.required],
      conveniosCobertos: ['', Validators.required],
      procedimentosRealizados: ['', Validators.required],
      identidade: ['', [Validators.required]],
      orgaoEmissor: ['', [Validators.required]],
      ufOrgaoEmissorIdentidade: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    });
    
    if(this.routerActive.snapshot.paramMap.get('id')){
      this.actionEdit = true;
      this.medicoSelected = this.routerActive.snapshot.paramMap.get('id');
      this.medicoService.getMedicoFilter(Number(this.medicoSelected));
      this.medicoService.getMedico().subscribe((data)=>{
        if(data.length){
          this.medicoObject = data[0];
          
          this.formularioCadastroMedico.setValue({
            nome: this.medicoObject.nome,
            conselho: this.medicoObject.id_conselho,
            registro: this.medicoObject.registro,
            ufMedico: this.medicoObject.uf_conselho,
            cpf: this.medicoObject.cpf,
            especialidades: this.medicoObject.especialidade,
            telefone: this.medicoObject.telefone,
            dataDeNascimento: this.retornaData(this.medicoObject.data_nascimento),
            sexo: this.medicoObject.sexo,
            funcao: this.medicoObject.funcao,
            conveniosCobertos: this.medicoObject.convenio,
            procedimentosRealizados: this.medicoObject.procedimento,
            identidade: this.medicoObject.rg,
            orgaoEmissor: this.medicoObject.orgao_emissor,
            ufOrgaoEmissorIdentidade: this.medicoObject.uf_orgao_emissor,
            email: this.medicoObject.email

          });
        }
      });
    }

    //CARREGAMENTO DOS CONSELHOS
    this.conselhoService.getConselhoFilter();
    this.conselhoService.getConselho().subscribe((data)=>{
      
      if(data.length > 0){
        data.forEach(element => {
          this.conselhoSelect.push(new Option(element.sigla,element.id));
        });
      }
    });

    //CARREGAMENTO DOS ESTADOS
    this.estadoService.getEstadoFilter();
    this.estadoService.getEstado().subscribe((data)=>{
      if(data.length > 0){
        //this.estadoSelect.push(new Option("",""));
        data.forEach(element => {
          this.estadoSelect.push(new Option(element.sigla,element.id));
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

    //CARREGAMENTO DE CONVENIOS
    this.convenioService.getConvenioFilter();
    this.convenioService.getConvenio().subscribe((data)=>{
      if(data.length > 0){
        data.forEach(element => {
          this.convenioSelect.push(new Option(element.nome,element.id));
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



    
  }
  onSubmit() {
    
    this.submitted = true;
    this.LoadService.show();
    if(this.formularioCadastroMedico.invalid){
      this.LoadService.hide();
      this.diplayErros();
      this.MessageService.errorMsg("Preencher os dados corretamente")
      return;
    }
    if(this.actionEdit){
      this.medicoService.edit(Number(this.medicoObject.id),this.formularioCadastroMedico);
    }else{
      this.medicoService.save(this.formularioCadastroMedico);
    }
    
  }

  voltar(){
    this.router.navigate(["/medico"]);
  }

  diplayErros(){
    let controls = this.formularioCadastroMedico.controls;
    for(let control in controls){
      if(controls[control].invalid){
        controls[control].markAsTouched();
      }
    }
  }
  retornaData(dataInput: string){
    return this.datePipe.transform(new Date(dataInput),'dd/MM/yyyy');
  }
}
