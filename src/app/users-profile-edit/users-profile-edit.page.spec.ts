import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersProfileEditPage } from './users-profile-edit.page';

describe('UsersProfileEditPage', () => {
  let component: UsersProfileEditPage;
  let fixture: ComponentFixture<UsersProfileEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersProfileEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersProfileEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
