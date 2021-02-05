import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabCrowdFundingPage } from './tab-crowd-funding.page';

describe('TabCrowdFundingPage', () => {
  let component: TabCrowdFundingPage;
  let fixture: ComponentFixture<TabCrowdFundingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCrowdFundingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabCrowdFundingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
