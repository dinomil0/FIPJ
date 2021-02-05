import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductPendingPage } from './product-pending.page';

describe('ProductPendingPage', () => {
  let component: ProductPendingPage;
  let fixture: ComponentFixture<ProductPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
