import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAgendamentoParte2Component } from './cadastro-agendamento-parte2.component';

describe('CadastroAgendamentoParte2Component', () => {
  let component: CadastroAgendamentoParte2Component;
  let fixture: ComponentFixture<CadastroAgendamentoParte2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAgendamentoParte2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAgendamentoParte2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
