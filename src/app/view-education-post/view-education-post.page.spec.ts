import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewEducationPostPage } from './view-education-post.page';

describe('ViewEducationPostPage', () => {
  let component: ViewEducationPostPage;
  let fixture: ComponentFixture<ViewEducationPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEducationPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEducationPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
