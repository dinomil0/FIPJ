import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeansRewardsPage } from './beans-rewards.page';

describe('BeansRewardsPage', () => {
  let component: BeansRewardsPage;
  let fixture: ComponentFixture<BeansRewardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeansRewardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeansRewardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
