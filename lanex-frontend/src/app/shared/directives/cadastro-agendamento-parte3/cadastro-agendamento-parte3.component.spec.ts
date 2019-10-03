import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAgendamentoParte3Component } from './cadastro-agendamento-parte3.component';

describe('CadastroAgendamentoParte3Component', () => {
  let component: CadastroAgendamentoParte3Component;
  let fixture: ComponentFixture<CadastroAgendamentoParte3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAgendamentoParte3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAgendamentoParte3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
