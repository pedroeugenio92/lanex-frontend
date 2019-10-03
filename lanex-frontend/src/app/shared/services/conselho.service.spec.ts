import { TestBed } from '@angular/core/testing';

import { ConselhoService } from './conselho.service';

describe('ConselhoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConselhoService = TestBed.get(ConselhoService);
    expect(service).toBeTruthy();
  });
});
