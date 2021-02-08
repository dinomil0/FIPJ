import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import { FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage';
import { AuthService } from '../shared/services/auth.service';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/products';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AnalyticsService } from '../shared/services/analytics.service';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CardsSelectPage } from '../cards-select/cards-select.page';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.page.html',
  styleUrls: ['./users-profile.page.scss'],
})
export class UsersProfilePage implements OnInit {
  @ViewChild('searchBar', { static: false }) searchBar: IonSearchbar;
  userId: string;
  user: User;
  userImage: string;
  statusArray: string[];
  status: string;
  userEmail: string;
  userName: string;
  userType: string;
  userStatus: string;
  users: User[];
  shippingAddress: string;
  bio: string;
  isUser = false;
  isBusiness = true;
  allProducts: Product[];
  productList: Product[];
  photo: SafeResourceUrl
  userData: any;

  constructor(private userService: UserService,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private analyticsService: AnalyticsService,
    private modalController: ModalController) {
    this.userService.getUserInstant().subscribe(data => {
      this.userData = data
      for (var u in data) {
        this.userType = data[u]["type"]
        this.userEmail = data[u]["email"]
        this.userId = data[u]["uid"]
      }
      if (this.userType === "User") {
        this.isUser = true;
      } else {
        this.isUser = false;
      }
      if (this.userType === 'Business') {
        this.isBusiness = true;
      } else {
        this.isBusiness = false;
      }
    })
 
    this.userService.getUser()
      .subscribe(data => {
        for (let user of data) {
          this.productService.getProductsBySeller(user.email)
            .subscribe(data => {
              this.productList = this.allProducts = data;
            });
        }
      })

  }
  ngOnInit() { }

  search(event) {
    const text = event.target.value;

    if (text && text.trim() !== '') {
      this.allProducts = this.productList.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()));
    } else {
      // Blank text, clear the search, show all products
      this.allProducts = this.productList;
    }
  }

  refresh(event) {
    this.searchBar.value = '';
    event.target.complete();
  }

  RouteToBeans() {
    this.analyticsService.logEventRoute(this.userEmail);
    this.analyticsService.logEventComments(this.userEmail, this.userType + " clicked into Rewards");
    this.router.navigate(['/beans-rewards'])
  }

  async RouteToCard() {
    this.analyticsService.logEventRoute(this.userEmail);
    this.analyticsService.logEventComments(this.userEmail, this.userType + " clicked into Cards");
    const modal = await this.modalController.create({
      component: CardsSelectPage
      });
      return await modal.present();
  }

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    console.log(this.photo)
    this.userService.updateUserPicture(this.userId, this.photo)
  }

}
