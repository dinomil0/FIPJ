import { Component } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import	firebase	from	'firebase/app';	
import	'firebase/analytics';	
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { SignOutModalPage } from './sign-out-modal/sign-out-modal.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title:'Home',
      url:'/home',
      icon:'home'
    },
    {
      title:'View Profile',
      url:'/users-profile',
      icon:'person-circle'
    },
    {
      title: 'Marketplace',
      url: '/marketplace-tabs',
      icon: 'bag'
    },
    {
      title:'Crowdfunding',
      url:'/crowdfundingtabs',
      icon:'people'
    },
    {
      title:'Education Forum',
      url:'/educationtabs',
      icon:'book'
    },
    {
      title:'Sign Out',
      url:'/sign-out-modal',
      icon:'exit'
    },
    

  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      var firebaseConfig = {
        apiKey: "AIzaSyDoBcxru4JwgU7_tVkoLVRk0aXnG5oSjQA",
        authDomain: "fypj-5cf75.firebaseapp.com",
        projectId: "fypj-5cf75",
        storageBucket: "fypj-5cf75.appspot.com",
        messagingSenderId: "99501682607",
        appId: "1:99501682607:web:2f4df7ea8b81f7f4b8895a",
        measurementId: "G-2HWQVKPJB0"
      };

      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      

    });
  }

  // async signout() {
  //   const modal = await this.modalController.create({
  //   component: SignOutModalPage
  //   });
  //   return await modal.present();
  //   }
}
