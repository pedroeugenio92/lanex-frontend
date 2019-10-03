import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProcedimentoComponent } from './lista-procedimento.component';

describe('ListaProcedimentoComponent', () => {
  let component: ListaProcedimentoComponent;
  let fixture: ComponentFixture<ListaProcedimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProcedimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
