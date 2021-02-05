import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarbonfootprintPendingPage } from './carbonfootprint-pending.page';

describe('CarbonfootprintPendingPage', () => {
  let component: CarbonfootprintPendingPage;
  let fixture: ComponentFixture<CarbonfootprintPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbonfootprintPendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarbonfootprintPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
