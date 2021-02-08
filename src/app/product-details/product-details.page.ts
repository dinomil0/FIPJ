import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { Product } from '../shared/models/products';
import { ProductService } from '../shared/services/product.service';
import { CartService } from '../shared/services/cart.service';
import { UserService } from '../shared/services/user.service';
import { AddToCartPopoverPage } from '../add-to-cart-popover/add-to-cart-popover.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { AuthService } from '../shared/services/auth.service';
import { AnalyticsService } from '../shared/services/analytics.service';
import { isEmptyObject } from 'jquery';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})


export class ProductDetailsPage implements OnInit {
  product: Product;
  productImg: string[] = [];
  email: string;
  totalCartItem: number;
  productLoaded: Promise<boolean>;
  userQuantity: any;
  open: any[] = [false];
  sellerObj: any;

  uid: string;
  wishListID: string;
  productIDArray: string[] = [];
  wishListArray: Product[] = [];
  onWishlist = false;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private cartService: CartService,
    private router: Router,
    private popoverController: PopoverController,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private authService: AuthService,
  ) {
    //retrieve cart from db
    this.cartService.getCountOfProductInCart().subscribe(data => {
      this.totalCartItem = Number(data)
    })
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();

    //retrieve product from db to display
    this.productService.getProductById(this.route.snapshot.params.prodID).then(prodData => {
      this.product = prodData;
      this.userService.getAllUsers().subscribe(sellerData => {
        for (const seller of sellerData) {
          if (seller.email == prodData.seller) {
            this.sellerObj = seller;
          }
        }
      })
    })

    this.userService.getUser().subscribe(user => {
      console.log(user)
      user.forEach(element => {
        this.uid = element.uid
      })

      this.userService.getUserById(this.uid).then(userData => {
        console.log(userData.wishList, "wishList")
        for (var list in userData.wishList) {
          for (var test in userData.wishList[list]["productID"]) {
            this.wishListID = userData.wishList[list]["id"]
            this.productIDArray.push(userData.wishList[list]["productID"][test])
            if(userData.wishList[list]["productID"][test] == this.product.id){
              this.onWishlist = true
            }
          }
        }
        for (var prod in this.productIDArray) {
          this.productService.getProductByID(this.productIDArray[prod]).subscribe(prodObject => {
            this.wishListArray.push(prodObject)
          })
        }
      })
    })
    loading.dismiss();
  }

  async addToCartPopover(ev: any) {
    let popover = await this.popoverController.create({ component: AddToCartPopoverPage, event: ev });
    await popover.present();
    let data = await (await popover.onDidDismiss()).data

    if (data >= 1) {
      this.cartService.addtoCart(this.route.snapshot.params.prodID, Number(data), this.product.price)
    }
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Are you sure to flag this product?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.productService.flagProduct(this.route.snapshot.params.prodID);
          }
        }]

    });
    return await alert.present();
  }

  //description toggle
  toogle(i) {
    this.open[i] = !this.open[i];
  }

  toCart() {
    this.router.navigate(['/view-cart'])
  }

  async presentWishlistAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
  }

  toggleHeart(item: Product) {
    var productId = item.id
    if (!this.onWishlist) {
      this.onWishlist = true
      this.productIDArray.push(productId)
      this.presentWishlistAlert("Added to wishlist", "You have added " +item.name +" to wishlist")
      console.log(this.productIDArray, "added")
      this.userService.updateWishList(this.uid, this.wishListID, this.productIDArray)
      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, " added " + item.name + " to wishlist");
    } 
    else {
      this.onWishlist = false
      for (let index in this.productIDArray) {
        if (productId == this.productIDArray[index]) {
          this.productIDArray.splice(Number(index), 1)
        }
      }
      console.log(this.productIDArray, "minus")
      this.presentWishlistAlert("Removed from wishlist", "You have removed " +item.name +" from wishlist")
      this.userService.updateWishList(this.uid, this.wishListID, this.productIDArray)
      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, " removed " + item.name + " from wishlist");
    }

  }
}
