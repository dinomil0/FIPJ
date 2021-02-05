import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateCrowdfundingListingPage } from './create-crowdfunding-listing.page';

describe('CreateCrowdfundingListingPage', () => {
  let component: CreateCrowdfundingListingPage;
  let fixture: ComponentFixture<CreateCrowdfundingListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCrowdfundingListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCrowdfundingListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
