import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateAverageCarbonfootprintPage } from './update-average-carbonfootprint.page';

describe('UpdateAverageCarbonfootprintPage', () => {
  let component: UpdateAverageCarbonfootprintPage;
  let fixture: ComponentFixture<UpdateAverageCarbonfootprintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAverageCarbonfootprintPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateAverageCarbonfootprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
