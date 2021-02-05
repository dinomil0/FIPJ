import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrowdfundingdonatePage } from './crowdfundingdonate.page';

describe('CrowdfundingdonatePage', () => {
  let component: CrowdfundingdonatePage;
  let fixture: ComponentFixture<CrowdfundingdonatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdfundingdonatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrowdfundingdonatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
