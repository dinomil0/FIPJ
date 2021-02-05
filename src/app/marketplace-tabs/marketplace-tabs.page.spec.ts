import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarketplaceTabsPage } from './marketplace-tabs.page';

describe('MarketplaceTabsPage', () => {
  let component: MarketplaceTabsPage;
  let fixture: ComponentFixture<MarketplaceTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarketplaceTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
