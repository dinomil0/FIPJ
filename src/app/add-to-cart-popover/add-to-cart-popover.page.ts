import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { CartService } from '../shared/services/cart.service';


@Component({
  selector: 'app-add-to-cart-popover',
  templateUrl: './add-to-cart-popover.page.html',
  styleUrls: ['./add-to-cart-popover.page.scss'],
})
export class AddToCartPopoverPage implements OnInit {
  quantityForm: FormGroup;
  userQuantity: 0;
  

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
    return ({positiveNumber: true});
    } else {
    return (null);
    }
    }



  constructor(public popoverController: PopoverController, private cartService: CartService, private route: ActivatedRoute) { 
    this.quantityForm = new FormGroup({ inputQuantity: new FormControl(1, [AddToCartPopoverPage.positiveNumber] )});
  }

  ngOnInit() {
  }

  minusQuantity() {
    if(this.userQuantity > 0)
    {
      this.userQuantity--;
    }
  }
  plusQuantity() {
    this.userQuantity++;    
  }


  submitQuantity(){
    if(this.userQuantity>0)
    {
      this.popoverController.dismiss(this.userQuantity)
    }
  }

}
