import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateProductListingPage } from './create-product-listing.page';

describe('CreateProductListingPage', () => {
  let component: CreateProductListingPage;
  let fixture: ComponentFixture<CreateProductListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
