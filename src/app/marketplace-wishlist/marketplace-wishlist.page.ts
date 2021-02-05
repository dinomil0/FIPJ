import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/analytics';
import { Product } from "../shared/models/products"
import { ProductService } from '../shared/services/product.service';
import { AlertController, IonSearchbar, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-marketplace-wishlist',
  templateUrl: './marketplace-wishlist.page.html',
  styleUrls: ['./marketplace-wishlist.page.scss'],
})
export class MarketplaceWishlistPage implements OnInit {
  @ViewChild('searchBar', { static: false }) searchBar: IonSearchbar;
  @ViewChild('productId', { static: false }) private dynamicRef: ElementRef<HTMLElement>
  allProducts: Product[];
  productList: Product[];
  topProducts: Product[];
  product: Product;
  increasing: boolean;
  wishListArray: Product[] = [];
  onWishlist = true;
  heartToggleIcon = "heart";
  users: User[];
  productIDArray: string[] = [];
  wishListID: string;
  uid: string;
  email: string;
  type: string;



  constructor(private productService: ProductService,
    private loadingController: LoadingController,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private alertController: AlertController,
    private analyticsService: AnalyticsService) {
    var user = this.authService.getCurrentUser()
    if (user != null) {
      this.email = user.email      
    } else {
      this.router.navigate(['/login'])
    }
    this.authService.observeAuthState(UserProfile => {
      this.userService.getAllUsers()
        .subscribe(data => {
          this.users = data;
          for (var user in this.users) {
            if (UserProfile.email == this.users[user]["email"]) {
              this.uid = this.users[user]["uid"]
              this.type = this.users[user]["type"]
              console.log("Users", this.uid)
            } else {
              continue;
            }
          }
          this.userService.getUserById(this.uid).then(userData => {
            console.log(userData.wishList, "wishList")
            for (var list in userData.wishList) {
              for (var test in userData.wishList[list]["productID"]) {
                this.wishListID = userData.wishList[list]["id"]
                this.productIDArray.push(userData.wishList[list]["productID"][test])
              }
            }
            for (var prod in this.productIDArray) {
              this.productService.getProductByID(this.productIDArray[prod]).subscribe(prodObject => {
                this.wishListArray.push(prodObject)
              })
            }

            this.allProducts = this.wishListArray
            this.allProducts.sort((a, b) => (a.rating > b.rating) ? -1 : 1)
          })

        })
    });

    this.increasing = true;
  }

  ngOnInit() {
  }

  toggleHeart(item: Product) {

    var productId = item.id

    item.onWishlist = !item.onWishlist;
    if (!item.onWishlist) {
      this.productIDArray.push(productId)
      this.presentAlert("Added to wishlist", "You have added " +item.name +" to wishlist")
      console.log(this.productIDArray, "added")
      this.userService.updateWishList(this.uid, this.wishListID, this.productIDArray)
      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, this.type+ " added " + item.name + " to wishlist");
    } else {
      for (let index in this.productIDArray) {
        if (productId == this.productIDArray[index]) {
          this.productIDArray.splice(Number(index), 1)
        }
      }
      console.log(this.productIDArray, "minus")
      this.presentAlert("Removed from wishlist", "You have removed " +item.name +" from wishlist")
      this.userService.updateWishList(this.uid, this.wishListID, this.productIDArray)
      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, this.type+ " removed " + item.name + " from wishlist");
    }

  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
  }

  search(event) {
    const text = event.target.value;
    if (text && text.trim() !== '') {
      this.wishListArray = this.allProducts.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()));
    }
    else {
      this.wishListArray = this.allProducts;
    }
  }

  refresh(event) {
    this.searchBar.value = '';
    event.target.complete();
  }

  displayPopular() {
    this.allProducts.sort((a, b) => (a.rating > b.rating) ? -1 : 1)
    document.getElementById("popularTab").style.borderBottomColor = 'black'
    document.getElementById("topProductsTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("priceTab").style.borderBottomColor = '#DCDCDC'

    document.getElementById("arrowSort").style.display = 'inline-block'
    document.getElementById("arrowSortDecreasing").style.display = 'none';
    document.getElementById("arrowSortIncreasing").style.display = 'none';
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " sort to popular");
    this.increasing = true
  }

  displayTop() {
    this.allProducts.sort((a, b) => (a.numberSold > b.numberSold) ? -1 : 1)
    document.getElementById("topProductsTab").style.borderBottomColor = 'black'
    document.getElementById("popularTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("priceTab").style.borderBottomColor = '#DCDCDC'

    document.getElementById("arrowSort").style.display = 'inline-block'
    document.getElementById("arrowSortDecreasing").style.display = 'none';
    document.getElementById("arrowSortIncreasing").style.display = 'none';
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " sort to top products");
    this.increasing = true
  }

  displayPrice() {
    document.getElementById("priceTab").style.borderBottomColor = 'black'
    document.getElementById("popularTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("topProductsTab").style.borderBottomColor = '#DCDCDC'

    document.getElementById("arrowSort").style.display = 'none'

    if (this.increasing == true) {
      this.allProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);
      document.getElementById("arrowSortIncreasing").style.display = 'inline-block';
      document.getElementById("arrowSortDecreasing").style.display = 'none';
      this.increasing = false
      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, this.type+ " sort by increasing");
    }
    else if (this.increasing == false) {
      this.allProducts.sort((a, b) => (a.price > b.price) ? -1 : 1);
      document.getElementById("arrowSortDecreasing").style.display = 'inline-block';
      document.getElementById("arrowSortIncreasing").style.display = 'none';
      this.increasing = true;
      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, this.type+ " sort by decreasing");
    }

  }

  productDetails(id: string, itemName: string){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " clicked into "+ itemName);
    this.router.navigate(['/product-details', id])
   
  }
}
