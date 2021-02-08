import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Cart } from '../shared/models/cart';
import { Product } from '../shared/models/products';
import { CartService } from '../shared/services/cart.service';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.page.html',
  styleUrls: ['./view-cart.page.scss'],
})
export class ViewCartPage implements OnInit {
  productArray: Cart[] = [];
  product: Product;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private loadingController: LoadingController,
    public alertController: AlertController,
  ) {

  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();
    //retrieve all item in user cart
    this.userService.getUserCart().subscribe(cartArray => {
      this.productArray = cartArray
      // cartArray.forEach(cartItem => {
      //     this.productArray.push(cartItem)
      //   })
    });
    loading.dismiss();
  }

  async deleteCartItem(productID :string){
    let alert = await this.alertController.create({
      message: 'Do you want to delete this item from your cart?',
      buttons: [
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.cartService.delete(productID)
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }

  minusQuantity(id: string) {
    this.cartService.updateCartQuantity(1, id, "-")
  }

  plusQuantity(id: string) {
    this.cartService.updateCartQuantity(1, id, "+")
  }

  productDetails(id: string) {
    this.router.navigate(['/product-details', id])
  }

  toCheckout(){
    this.router.navigate(['/checkout'])
  }


}
