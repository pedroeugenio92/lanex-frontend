import { TestBed } from '@angular/core/testing';

import { TipoprocedimentoService } from './tipoprocedimento.service';

describe('TipoprocedimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoprocedimentoService = TestBed.get(TipoprocedimentoService);
    expect(service).toBeTruthy();
  });
});
