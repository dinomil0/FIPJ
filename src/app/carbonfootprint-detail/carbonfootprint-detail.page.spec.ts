import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarbonfootprintDetailPage } from './carbonfootprint-detail.page';

describe('CarbonfootprintDetailPage', () => {
  let component: CarbonfootprintDetailPage;
  let fixture: ComponentFixture<CarbonfootprintDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbonfootprintDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarbonfootprintDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
