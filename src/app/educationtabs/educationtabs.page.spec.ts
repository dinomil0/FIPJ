import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationtabsPage } from './educationtabs.page';

describe('EducationtabsPage', () => {
  let component: EducationtabsPage;
  let fixture: ComponentFixture<EducationtabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationtabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationtabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
