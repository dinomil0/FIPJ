import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TotalBusinessPage } from './total-business.page';

describe('TotalBusinessPage', () => {
  let component: TotalBusinessPage;
  let fixture: ComponentFixture<TotalBusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalBusinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TotalBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
