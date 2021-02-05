import { TestBed } from '@angular/core/testing';

import { BeansRewardsService } from './beans-rewards.service';

describe('BeansRewardsService', () => {
  let service: BeansRewardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeansRewardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
