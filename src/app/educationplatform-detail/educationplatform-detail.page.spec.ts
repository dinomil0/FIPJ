import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationplatformDetailPage } from './educationplatform-detail.page';

describe('EducationplatformDetailPage', () => {
  let component: EducationplatformDetailPage;
  let fixture: ComponentFixture<EducationplatformDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationplatformDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationplatformDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
