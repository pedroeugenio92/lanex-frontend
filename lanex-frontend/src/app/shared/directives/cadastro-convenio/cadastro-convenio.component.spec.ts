import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroConvenioComponent } from './cadastro-convenio.component';

describe('CadastroConvenioComponent', () => {
  let component: CadastroConvenioComponent;
  let fixture: ComponentFixture<CadastroConvenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
