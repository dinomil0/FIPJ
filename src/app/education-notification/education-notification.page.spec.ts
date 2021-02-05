import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationNotificationPage } from './education-notification.page';

describe('EducationNotificationPage', () => {
  let component: EducationNotificationPage;
  let fixture: ComponentFixture<EducationNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationNotificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
