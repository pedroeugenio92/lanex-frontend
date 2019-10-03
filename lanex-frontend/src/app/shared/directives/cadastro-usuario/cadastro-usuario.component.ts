import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { LoadService } from '../../services/load.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario.model';
import { Option } from '../../models/Option.model';
import { ClinicaService } from '../../services/clinica.service';
import { PerfilService } from '../../services/perfil.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  environment: any;
  usuarioObject: Usuario = new Usuario();
  formularioCadastroUsuario: FormGroup;
  actionEdit: boolean = false;
  usuarioSelected: string;
  submitted = false;

  perfilSelect: Option[] = [];
  clinicaSelect: Option[] = [];

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/ , '-', /\d/,/\d/];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private MessageService: MessageService,
    private LoadService: LoadService,
    private routerActive: ActivatedRoute,
    private usuarioService: UsuarioService,
    private clinicaService: ClinicaService,
    private perfilService: PerfilService) { }

  ngOnInit() {

    this.environment = environment;
    this.formularioCadastroUsuario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(250)]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      status: [true, [Validators.required]],
      senha: ['', [Validators.required]],
      perfil: ['', [Validators.required]],
      clinica: ['']
    });

    //CARREGAMENTO DE PERFIL
    this.perfilService.getPerfilFilter();
    this.perfilService.getPerfil().subscribe((data)=>{
      
      if(data.length > 0){
        data.forEach(element => {
          this.perfilSelect.push(new Option(element.descricao,element.id));
        });
      }
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

    if(this.routerActive.snapshot.paramMap.get('id')){
      this.actionEdit = true;
      this.usuarioSelected = this.routerActive.snapshot.paramMap.get('id');

      this.usuarioService.getUsuarioFilter(Number(this.usuarioSelected));
      this.usuarioService.getUsuario().subscribe((data)=>{
        if(data.length){

          this.usuarioObject = data[0];
          
          //REMOVENDO A VALIDADE REQUIRED DE SENHA
          this.formularioCadastroUsuario.get('senha').clearValidators();

          this.formularioCadastroUsuario.setValue({
            nome: this.usuarioObject.nome,
            cpf: this.usuarioObject.cpf,
            email: this.usuarioObject.email,
            status: this.usuarioObject.status,
            senha: '',
            perfil: this.usuarioObject.id_perfil,
            clinica: this.usuarioObject.id_clinica,
            

          });
        }
      });
    }
  }

  onSubmit() {
    
    this.submitted = true;
    this.LoadService.show();

    if(this.formularioCadastroUsuario.invalid){
      this.LoadService.hide();
      this.diplayErros();
      this.MessageService.errorMsg("Preencher os dados corretamente")
      return;
    }
    this.checkClinica();
    if(this.actionEdit){
      this.usuarioService.edit(Number(this.usuarioObject.id),this.formularioCadastroUsuario);
    }else{
      this.usuarioService.save(this.formularioCadastroUsuario);
    }
    
  }

  back(){
    this.router.navigate(["/clinica"]);
  }

  diplayErros(){
    let controls = this.formularioCadastroUsuario.controls;
    for(let control in controls){
      if(controls[control].invalid){
        controls[control].markAsTouched();
      }
    }
  }

  checkClinica(){

    if(this.formularioCadastroUsuario.get('perfil').value != this.environment.PERFIL_ATENDENTE){
      this.formularioCadastroUsuario.get('clinica').setValue('');
    }
  }

}
