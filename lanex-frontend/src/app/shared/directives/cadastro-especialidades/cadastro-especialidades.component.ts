import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { LoadService } from '../../services/load.service';
import { Option } from '../../models/Option.model';
import { ConvenioService } from '../../services/convenio.service';
import { Especialidade } from '../../models/Especialidade.model';
import { EspecialidadeService } from '../../services/especialidade.service';


@Component({
  selector: 'app-cadastro-especialidades',
  templateUrl: './cadastro-especialidades.component.html',
  styleUrls: ['./cadastro-especialidades.component.css']
})
export class CadastroEspecialidadesComponent implements OnInit {
  formularioCadastroEspecialidade: FormGroup;
  convenioSelect: Option[] = [];
  displayedColumns: string[] = ['nome'];
  dataSource = new MatTableDataSource([]);
  dataSourceList = [];
  convenioVisibilidade = true;
  especialidadeObject: Especialidade = new Especialidade();
  especialidadeSelected: string;
  actionEdit: boolean = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LoadService: LoadService,
    private convenioService: ConvenioService,
    private especialidadeService: EspecialidadeService,
    private MessageService: MessageService,
    private routerActive: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formularioCadastroEspecialidade = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(250)]],
      conveniosCobertos: ['', Validators.required],
    });

    if(this.routerActive.snapshot.paramMap.get('id')){

      this.actionEdit = true;
      this.especialidadeSelected = this.routerActive.snapshot.paramMap.get('id');
      this.especialidadeService.getEspecialidadeFilter(Number(this.especialidadeSelected));
      this.especialidadeService.getEspecialidade().subscribe((data)=>{
        if(data.length){
          this.especialidadeObject = data[0];
          this.formularioCadastroEspecialidade.setValue({
            nome: this.especialidadeObject.descricao,
            conveniosCobertos: this.especialidadeObject.convenio,
          });
        }
      });

    }

    //CARREGAMENTO DE CONVENIOS
    this.convenioService.getConvenioFilter();
    this.convenioService.getConvenio().subscribe((data)=>{
      if(data.length > 0){
        data.forEach(element => {
          this.convenioSelect.push(new Option(element.nome,element.id));
        });
      } 
    });
  }

  onSubmit() {
    
    this.submitted = true;
    this.LoadService.show();
    if(this.formularioCadastroEspecialidade.invalid){
      this.LoadService.hide();
      this.diplayErros();
      this.MessageService.errorMsg("Preencher os dados corretamente")
      return;
    }
    if(this.actionEdit){
      this.especialidadeService.edit(Number(this.especialidadeObject.id),this.formularioCadastroEspecialidade);
    }else{
      this.especialidadeService.save(this.formularioCadastroEspecialidade);
    }
    
  }
  voltar(){
    this.router.navigate(["/especialidade"]);
  }

  diplayErros(){
    let controls = this.formularioCadastroEspecialidade.controls;
    for(let control in controls){
      if(controls[control].invalid){
        controls[control].markAsTouched();
      }
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showConvenios(){
    let selectedConvenios = this.formularioCadastroEspecialidade.controls['conveniosCobertos'].value;
    let convenioList = this.convenioSelect.filter((x) => {
      return selectedConvenios.includes(x.value)
    })
    this.dataSource.data = convenioList;
  }
}
