import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateEducationPostPage } from './create-education-post.page';

describe('CreateEducationPostPage', () => {
  let component: CreateEducationPostPage;
  let fixture: ComponentFixture<CreateEducationPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEducationPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEducationPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
