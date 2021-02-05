import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TotalUsersPage } from './total-users.page';

describe('TotalUsersPage', () => {
  let component: TotalUsersPage;
  let fixture: ComponentFixture<TotalUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TotalUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
