import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationProfilePage } from './education-profile.page';

describe('EducationProfilePage', () => {
  let component: EducationProfilePage;
  let fixture: ComponentFixture<EducationProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
