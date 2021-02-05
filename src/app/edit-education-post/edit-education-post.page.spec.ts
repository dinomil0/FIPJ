import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEducationPostPage } from './edit-education-post.page';

describe('EditEducationPostPage', () => {
  let component: EditEducationPostPage;
  let fixture: ComponentFixture<EditEducationPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEducationPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEducationPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
