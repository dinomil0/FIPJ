import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductFlagPage } from './product-flag.page';

describe('ProductFlagPage', () => {
  let component: ProductFlagPage;
  let fixture: ComponentFixture<ProductFlagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFlagPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFlagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
