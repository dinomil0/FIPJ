import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
 
// Init for the web
import "@capacitor-community/firebase-analytics";
 
import { Plugins } from "@capacitor/core";
const { FirebaseAnalytics, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  analyticsEnabled = true;
  trackRoute: string;

  constructor(private router: Router) {
    this.initFb();
    this.router.events.pipe(
      filter((e: RouterEvent) => e instanceof NavigationEnd),
    ).subscribe((e: RouterEvent) => {
      this.trackRoute = e.url
      console.log('route changed: ', e.url);
      this.setScreenName(e.url)
    });
   }
   async initFb() {
    if ((await Device.getInfo()).platform == 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
    }
  }
 
  setUser(email: string) {
    // Use Firebase Auth uid
    FirebaseAnalytics.setUserId({
      userId: email,
    });
  }
 
  setProperty() {
    FirebaseAnalytics.setUserProperty({
      name: "framework",
      value: "angular",
    });
  }
 
  logEventRoute(email: string) {
    FirebaseAnalytics.logEvent({
      name: this.trackRoute,
      params: {
        method: email
      }
    });
  }
  
  logEventComments(email: string, comments: string) {
    FirebaseAnalytics.logEvent({
      name: comments,
      params: {
        method: email
      }
    });
  }
 
  setScreenName(screenName) {
    FirebaseAnalytics.setScreenName({
      screenName
    });
  }
 
  toggleAnalytics() {
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setCollectionEnabled({
      enabled: this.analyticsEnabled,
    });    
  }

}
