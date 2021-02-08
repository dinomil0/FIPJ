import { Component, OnInit } from '@angular/core';
// import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { Product } from "../shared/models/products"
import { ProductService } from '../shared/services/product.service';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import 'firebase/analytics';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Router } from '@angular/router';
import { Searchtool } from '../shared/models/searchtool';
import { SearchtoolService } from '../shared/services/searchtool.service';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { ThrowStmt } from '@angular/compiler';
import { CartService } from '../shared/services/cart.service';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';
import { MarketplaceEcoRatingFilterPage } from '../marketplace-eco-rating-filter/marketplace-eco-rating-filter.page';
import { carbonFootprint } from '../shared/models/carbonFootprint';
// import { AnalyticsFirebase } from "@ionic-native/analytics-firebase";


@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})

export class MarketplacePage implements OnInit {
  allProducts: Product[] = [];
  productList: Product[] = [];
  topProducts: Product[];
  datasArray: Product[] = [];
  searchArray: Searchtool[]
  userArray: User[];
  searchObj: Searchtool
  product: Product;
  increasing: boolean;
  user: User;
  carbonFootprintArray: carbonFootprint[];
  carbonFootprint: carbonFootprint;
  uid: string;
  totalCartItem: number;
  email: any;
  type: any;
  ecoRating: number;
  seller: string[] = [];

  constructor(
    private productService: ProductService,
    private searchtoolService: SearchtoolService,
    private loadingController: LoadingController,
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private cartService: CartService,
    private analyticsService: AnalyticsService,
    private authService: AuthService) {
      
    var user = this.authService.getCurrentUser()
    if (user != null) {
      this.email = user.email
    } else {
      this.router.navigate(['/login'])
    }
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();
    this.cartService.getCountOfProductInCart().subscribe(data => {
      this.totalCartItem = Number(data)
    })
    this.productService.getProducts()

    this.userService.getAllCarbonFootprint()
      .subscribe(data => {
        this.carbonFootprintArray = data
        for (let carbonFootprint of this.carbonFootprintArray) {
          if (carbonFootprint.ecoRating >= this.userService.getAllEcoRating()) {
            this.seller.push(carbonFootprint.email)
            this.productService.getAllProducts(this.seller)
              .subscribe(data => {
                for (let datas of data) {
                  if (datas.flag == "true") {
                    const index = data.indexOf(datas, 1)
                    data.splice(index, 1)
                  }
                  this.productList = this.allProducts = data
                  this.allProducts.sort((a, b) => (a.numberSold > b.numberSold) ? -1 : 1)
                  if (this.productList != null) {
                    loading.dismiss();
                  }
                }
              })
          }
        }
      })

    // this.productList = []
    // this.productService.getProducts()
    // .subscribe(data => {
    //   for(let datas of data){
    //     if(datas.flag == "true"){
    //       const index = data.indexOf(datas, 1)
    //       data.splice(index, 1)
    //     }
    //   }

    //   this.userService.getAllCarbonFootprint()
    //   .subscribe(data2 => {
    //     this.carbonFootprintArray = data2
    //     console.log(this.carbonFootprintArray)
    //     for(let carbonFootprint of this.carbonFootprintArray){
    //       if( carbonFootprint.ecoRating >= this.userService.getAllEcoRating()){
    //         this.seller.push(carbonFootprint.email)
    //         for(let products of data){
    //           for(let p of this.seller){
    //             if(products.seller == p){
    //               if(this.productList.includes(products) == false){
    //                 this.productList.push(products)
    //                 console.log(this.productList)
    //                 this.allProducts = this.productList
    //                 this.allProducts.sort((a, b) => (a.numberSold > b.numberSold) ? -1 : 1)
    //                 if (this.productList != null){
    //                   loading.dismiss();
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   })
    // });
    // this.increasing = true;

    this.userService.getUser()
      .subscribe(data => {
        for (var u in data) {
          this.uid = data[u]["uid"]
          this.type = data[u]["type"]
        }


        this.searchtoolService.getSearchHistory(this.uid)
          .then(data => {
            this.user = data;
            for (let i of this.user.searchList) {
              if (i.notified == true && i.userNotified == false) {
                this.searchObj = i
                this.searchAlert(this.searchObj, this.uid)
              }
            }
          })
      })
  }

  async searchAlert(searchObj: Searchtool, uid: string) {
    const alert = this.alertController.create({
      header: 'Alert',
      message: 'A product similar to your recent search "' + searchObj.name + '" has been listed',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, "Recommended product to " + this.type);
          this.router.navigate(['/product-details/' + searchObj.productID])
          this.searchtoolService.updateUserNotified(uid, searchObj.productID)
        }
      }
      ]
    });
    (await alert).present()
  }

  search(event) {
    const text = event.target.value;
    console.log(text)
    if (text && text.trim() !== '') {
      this.allProducts = this.productList.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()));
    }
    else {
      this.allProducts = this.productList;
    }
  }

  cancelSearch(event) {
    const text = event.target.value
    console.log(text)
    let newSearch = new Searchtool(text, false, false, '')
    console.log(newSearch)
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " cancel search");
    this.searchtoolService.addSearch(this.uid, newSearch);
  }

  displayPopular() {
    this.allProducts.sort((a, b) => (a.numberSold > b.numberSold) ? -1 : 1)
    document.getElementById("popularTab").style.borderBottomColor = 'black'
    document.getElementById("topProductsTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("ecoRatingTab").style.borderBottomColor = '#DCDCDC'
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " sort to popular");
  }

  displayTop() {
    this.allProducts.sort((a, b) => (a.rating > b.rating) ? -1 : 1)
    document.getElementById("topProductsTab").style.borderBottomColor = 'black'
    document.getElementById("popularTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("ecoRatingTab").style.borderBottomColor = '#DCDCDC'

    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " sort to top products");
  }

  displayEco() {
    this.router.navigate(['/marketplace-eco-rating-filter'])
    document.getElementById("topProductsTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("popularTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("ecoRatingTab").style.borderBottomColor = 'black'

    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " sort by eco-rating");
  }

  productDetails(id: string, itemName: string) {
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into " + itemName);
    this.router.navigate(['/product-details', id])

  }
  
  toCart(){
    this.router.navigate(['/view-cart'])
  }

}
