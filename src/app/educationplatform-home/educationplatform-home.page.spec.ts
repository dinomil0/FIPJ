import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationplatformHomePage } from './educationplatform-home.page';

describe('EducationplatformHomePage', () => {
  let component: EducationplatformHomePage;
  let fixture: ComponentFixture<EducationplatformHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationplatformHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationplatformHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
