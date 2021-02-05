import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarbonFootprintSummaryPage } from './carbon-footprint-summary.page';

describe('CarbonFootprintSummaryPage', () => {
  let component: CarbonFootprintSummaryPage;
  let fixture: ComponentFixture<CarbonFootprintSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbonFootprintSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarbonFootprintSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
