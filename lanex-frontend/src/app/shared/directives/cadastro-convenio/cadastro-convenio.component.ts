import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadService } from '../../services/load.service';
import { MessageService } from '../../services/message.service';
import { ConvenioService } from '../../services/convenio.service';
import { Convenio } from '../../models/Convenio.model';

@Component({
  selector: 'app-cadastro-convenio',
  templateUrl: './cadastro-convenio.component.html',
  styleUrls: ['./cadastro-convenio.component.css']
})
export class CadastroConvenioComponent implements OnInit {
  imagemIcone = "data:image/png;base64,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"
  formularioCadastroConvenio: FormGroup;
  convenioSelected: string;
  convenioObject: Convenio = new Convenio();
  actionEdit: boolean = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LoadService: LoadService,
    private routerActive: ActivatedRoute,
    private MessageService: MessageService,
    private convenioService: ConvenioService
  ) { }

  ngOnInit() {

    this.formularioCadastroConvenio = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(250)]],
      razao_social: [null, [Validators.required, Validators.maxLength(250)]],
      status: [true, [Validators.required]],
      icone: ['']
    });

    if(this.routerActive.snapshot.paramMap.get('id')){

      this.actionEdit = true;
      this.convenioSelected = this.routerActive.snapshot.paramMap.get('id');
      this.convenioService.getConvenioFilter(Number(this.convenioSelected));
      this.convenioService.getConvenio().subscribe((data)=>{
        if(data.length){
          this.convenioObject = data[0];
          this.imagemIcone = this.convenioObject.icone;
          this.formularioCadastroConvenio.setValue({
            nome: this.convenioObject.nome,
            razao_social: this.convenioObject.razao_social,
            status: this.convenioObject.status,
            icone: this.convenioObject.icone
          });

        }
      });

    }

  }

  onSubmit() {

    this.submitted = true;
    this.LoadService.show();
    if(this.formularioCadastroConvenio.invalid){
      this.LoadService.hide();
      this.diplayErros();
      this.MessageService.errorMsg("Preencher os dados corretamente")
      return;
    }
    this.formularioCadastroConvenio.get('icone').setValue(this.imagemIcone);
    if(this.actionEdit){
      this.convenioService.edit(Number(this.convenioObject.id),this.formularioCadastroConvenio);
    }else{
      this.convenioService.save(this.formularioCadastroConvenio);
    }

  }

  voltar(){
    this.router.navigate(["/convenio"]);
  }

  diplayErros(){
    let controls = this.formularioCadastroConvenio.controls;
    for(let control in controls){
      if(controls[control].invalid){
        controls[control].markAsTouched();
      }
    }
  }

  changeImage(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.formularioCadastroConvenio.get('icone').setValue(file);

      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.imagemIcone = reader.result.toString();
      }
    }
  }

}
