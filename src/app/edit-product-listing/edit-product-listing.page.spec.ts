import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditProductListingPage } from './edit-product-listing.page';

describe('EditProductListingPage', () => {
  let component: EditProductListingPage;
  let fixture: ComponentFixture<EditProductListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
