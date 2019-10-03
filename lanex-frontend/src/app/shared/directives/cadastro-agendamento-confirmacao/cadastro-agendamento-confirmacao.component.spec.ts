import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAgendamentoConfirmacaoComponent } from './cadastro-agendamento-confirmacao.component';

describe('CadastroAgendamentoConfirmacaoComponent', () => {
  let component: CadastroAgendamentoConfirmacaoComponent;
  let fixture: ComponentFixture<CadastroAgendamentoConfirmacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAgendamentoConfirmacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAgendamentoConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
