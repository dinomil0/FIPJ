import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrowdfundingPendingPage } from './crowdfunding-pending.page';

describe('CrowdfundingPendingPage', () => {
  let component: CrowdfundingPendingPage;
  let fixture: ComponentFixture<CrowdfundingPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdfundingPendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrowdfundingPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
