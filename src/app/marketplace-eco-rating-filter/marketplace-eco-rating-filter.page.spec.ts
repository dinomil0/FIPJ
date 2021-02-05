import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarketplaceEcoRatingFilterPage } from './marketplace-eco-rating-filter.page';

describe('MarketplaceEcoRatingFilterPage', () => {
  let component: MarketplaceEcoRatingFilterPage;
  let fixture: ComponentFixture<MarketplaceEcoRatingFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceEcoRatingFilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarketplaceEcoRatingFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
