import { TestBed } from '@angular/core/testing';

import { BeansHistoryService } from './beans-history.service';

describe('BeansHistoryService', () => {
  let service: BeansHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeansHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
