import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEspecialidadesComponent } from './cadastro-especialidades.component';

describe('CadastroEspecialidadesComponent', () => {
  let component: CadastroEspecialidadesComponent;
  let fixture: ComponentFixture<CadastroEspecialidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEspecialidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
