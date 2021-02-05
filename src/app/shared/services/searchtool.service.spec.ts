import { TestBed } from '@angular/core/testing';

import { SearchtoolService } from './searchtool.service';

describe('SearchtoolService', () => {
  let service: SearchtoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchtoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
