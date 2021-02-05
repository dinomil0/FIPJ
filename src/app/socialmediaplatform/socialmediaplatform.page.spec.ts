import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocialmediaplatformPage } from './socialmediaplatform.page';

describe('SocialmediaplatformPage', () => {
  let component: SocialmediaplatformPage;
  let fixture: ComponentFixture<SocialmediaplatformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialmediaplatformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialmediaplatformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
