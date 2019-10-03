import { TestBed } from '@angular/core/testing';

import { EspecialidadeService } from './especialidade.service';

describe('EspecialidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspecialidadeService = TestBed.get(EspecialidadeService);
    expect(service).toBeTruthy();
  });
});
