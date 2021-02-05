import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardsSelectPage } from './cards-select.page';

describe('CardsSelectPage', () => {
  let component: CardsSelectPage;
  let fixture: ComponentFixture<CardsSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardsSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
