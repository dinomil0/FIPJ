import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationplatformPage } from './educationplatform.page';

describe('EducationplatformPage', () => {
  let component: EducationplatformPage;
  let fixture: ComponentFixture<EducationplatformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationplatformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationplatformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
