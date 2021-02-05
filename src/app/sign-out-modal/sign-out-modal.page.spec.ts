import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignOutModalPage } from './sign-out-modal.page';

describe('SignOutModalPage', () => {
  let component: SignOutModalPage;
  let fixture: ComponentFixture<SignOutModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOutModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignOutModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
