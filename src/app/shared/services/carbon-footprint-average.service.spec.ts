import { TestBed } from '@angular/core/testing';

import { CarbonFootprintAverageService } from './carbon-footprint-average.service';

describe('CarbonFootprintAverageService', () => {
  let service: CarbonFootprintAverageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarbonFootprintAverageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
