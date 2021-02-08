import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import firebaseConfig  from './firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { EditAccountsPageModule } from './edit-accounts/edit-accounts.module';
import { AuthService } from './shared/services/auth.service';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { PayPal } from '@ionic-native/paypal/ngx';



import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { Camera } from '@ionic-native/camera/ngx';
import { CardsPageModule } from './cards/cards.module';
// import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
// import { Camera } from '@ionic-native/camera/ngx';

import { Facebook } from '@ionic-native/facebook/ngx';
import { SignOutModalPageModule } from './sign-out-modal/sign-out-modal.module';
import { AddToCartPopoverPageModule } from './add-to-cart-popover/add-to-cart-popover.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationModalPageModule } from './registration-modal/registration-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    EditAccountsPageModule,
    NgxIonicImageViewerModule,
    CardsPageModule,
    SignOutModalPageModule,
    EditAccountsPageModule,
    AngularFireStorageModule,
    AddToCartPopoverPageModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RegistrationModalPageModule, FormsModule],
    // NgxIonicImageViewerModule,],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    GooglePlus,
    Facebook,
    InAppBrowser,
    PayPal  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
