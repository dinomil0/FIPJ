import { TestBed } from '@angular/core/testing';

import { AcraService } from './acra.service';

describe('AcraService', () => {
  let service: AcraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
