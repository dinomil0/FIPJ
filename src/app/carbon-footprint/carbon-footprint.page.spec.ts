import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarbonFootprintPage } from './carbon-footprint.page';

describe('CarbonFootprintPage', () => {
  let component: CarbonFootprintPage;
  let fixture: ComponentFixture<CarbonFootprintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbonFootprintPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarbonFootprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
