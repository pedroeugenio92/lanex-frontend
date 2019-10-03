import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspecialidadeComponent } from './lista-especialidade.component';

describe('ListaEspecialidadeComponent', () => {
  let component: ListaEspecialidadeComponent;
  let fixture: ComponentFixture<ListaEspecialidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEspecialidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEspecialidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
