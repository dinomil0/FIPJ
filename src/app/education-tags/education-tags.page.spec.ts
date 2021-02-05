import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationTagsPage } from './education-tags.page';

describe('EducationTagsPage', () => {
  let component: EducationTagsPage;
  let fixture: ComponentFixture<EducationTagsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationTagsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationTagsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
