import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrowdfundingtabsPage } from './crowdfundingtabs.page';

describe('CrowdfundingtabsPage', () => {
  let component: CrowdfundingtabsPage;
  let fixture: ComponentFixture<CrowdfundingtabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdfundingtabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrowdfundingtabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
