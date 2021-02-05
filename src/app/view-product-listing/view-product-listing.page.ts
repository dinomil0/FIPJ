import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import 'firebase/analytics';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Product } from '../shared/models/products';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-view-product-listing',
  templateUrl: './view-product-listing.page.html',
  styleUrls: ['./view-product-listing.page.scss'],
})
export class ViewProductListingPage implements OnInit {
  product: Product[];
  loaded: boolean;
  email: any;
  type: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private userService: UserService,
    public alertController: AlertController,
    private router: Router,
    private analyticsService: AnalyticsService) {
    this.userService.getUser()
      .subscribe(data => {
        for (var u in data) {
          this.email = data[u]["email"]
          this.type = data[u]["type"]
        }
      })
  }

  async ngOnInit() {
    this.loaded = false;
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();
    this.userService.getUser()
      .subscribe(data => {
        for (let user of data) {
          this.productService.getProductsBySeller(user.email)
            .subscribe(data => {
              this.product = data;
              if (this.product != null) {
                loading.dismiss();
              }
            });
        }
      })

  }

  async presentConfirm(p: Product) {
    let alert = await this.alertController.create({
      message: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.analyticsService.logEventRoute(this.email);
            this.analyticsService.logEventComments(this.email, this.type + " deleted post");
            this.productService.delete(p)
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

  createProductListing() {
    this.router.navigate(['create-product-listing'])
  }

  editProductListing(id: string) {
    this.router.navigate(['edit-product-listing', id])
  }
}
