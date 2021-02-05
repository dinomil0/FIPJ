import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import { AlertController, IonInput, isPlatform, LoadingController, ModalController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import '@codetrix-studio/capacitor-google-auth';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { BeansRewardsService } from '../shared/services/beans-rewards.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { FacebookLogin, FacebookLoginPlugin } from '@capacitor-community/facebook-login';
registerWebPlugin(FacebookLogin);
import { CardsService } from '../shared/services/cards.service';
import { Cards } from '../shared/models/cards';
import { AnalyticsService } from '../shared/services/analytics.service';
import { RegistrationModalPage } from '../registration-modal/registration-modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // public loading;
  fbLogin: FacebookLoginPlugin;
  user = null;
  token = null;
  loginForm: FormGroup;
  loginError: any;
  showPassword = false;
  passwordToggleIcon = "eye";
  userInfo: null;
  public isGoogleLogin = false;
  users: User[];
  emailArray = [];
  type: string;
  emailReset: any;
  userCards: Cards[];
  userIdForCards: string;

  constructor(private formB: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private router: Router,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private google: GooglePlus,
    private userService: UserService,
    private beansRewardsService: BeansRewardsService,
    private fb: Facebook,
    private cardService: CardsService,
    private analyticsService: AnalyticsService,
    private modalController: ModalController) {

  }

  ngOnInit() {
    this.loginForm = this.formB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // this.loading = await this.loadingController.create({
    //   message: 'Connecting ...'
    // });
  }

  async chooseRegistration(){
    const modal = await this.modalController.create({
      component: RegistrationModalPage
      });
      return await modal.present();
    // this.router.navigate([])
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }

  }
  async normallogin() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    try {
      await loading.present();
      const res = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password)

      if (res.user) {
        this.userService.getAllUsers()
          .subscribe(data => {
            this.users = data;
            for (var user in this.users) {
              if (this.loginForm.value.email == this.users[user]["email"]) {
                var uid = this.users[user]["uid"]
                // console.log("Users", uid)
              } else {
                continue;
              }
            }
            this.userService.getUserById(uid).then(data => {
              this.type = data.type
              if (this.type === "User") {
                this.analyticsService.logEventRoute(this.loginForm.value.email);
                this.analyticsService.logEventComments(this.loginForm.value.email, "User Logging In");
                this.router.navigate(['/home'])
              }
              if (this.type === "Business") {
                this.analyticsService.logEventRoute(this.loginForm.value.email);
                this.analyticsService.logEventComments(this.loginForm.value.email, "Business Logging In");
                this.router.navigate(['/home'])
              }
              if (this.type === "Admin") {
                this.analyticsService.logEventRoute(this.loginForm.value.email);
                this.analyticsService.logEventComments(this.loginForm.value.email, "Admin  Logging In");
                this.router.navigate(['/tabs/tab1'])
              }
            });
          })

      }
      await loading.dismiss();


    } catch (err) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: 'Please try again',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async googleLogin() {
    // Verify accessToken and idToken

    let params: any;

    if (this.platform.is('capacitor')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '99501682607-426tueitmb1so5a80nuht1579q99mcdj.apps.googleusercontent.com', //  webclientID 'string'
          offline: true
        };
      }
      else {
        params = {};
      }
      this.google.login(params).then((response) => {
        const { idToken, accessToken } = response;
        this.onLoginSuccessGoogle(idToken, accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + JSON.stringify(error));
      });

    } else {
      // const loading = await this.loadingController.create({
      //   spinner: "circular",
      //   message: "Please wait..."
      // });
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(googleUser => {
        console.log('success in google login', googleUser);

        var email = googleUser["user"]["email"];
        var name = googleUser["user"]["displayName"];
        var imageURL = googleUser["user"]["photoURL"];

        try {
          var accountExist = false;
          let count: number = 0;
          let createUser: number = 0;
          this.userService.getAllUsersEmails()
            .subscribe(data => {
              // this.users = data;
              while (count <= data.length) {
                // console.log("intoWhileloop")
                if (email === data[count]) {
                  // console.log("UserEXISTS")
                  count += 1
                  accountExist = true;
                  this.analyticsService.logEventRoute(email);
                  this.analyticsService.logEventComments(email, "User Logging In");
                  this.router.navigate(['/home'])
                  break;
                } else {
                  // console.log("NO USER")
                  accountExist = false;
                  count += 1

                }
              }
              if (accountExist == false) {
                // console.log("goINACCOUNTEXISTfalse")

                if (createUser == 0) {
                  this.userService.createUser(email,
                    name,
                    "",
                    "User",
                    "active",
                    imageURL,
                    "")
                  this.beansRewardsService.createBeanWallet(email)
                  createUser += 1
                  // console.log("createUser")
                }
                accountExist = true;
                this.analyticsService.logEventRoute(email);
                this.analyticsService.logEventComments(email, "User Logging In");
                this.router.navigate(['/home'])
              } else {
              }
            })
        } catch (err) {
          console.dir(err)

        }

        this.isGoogleLogin = true;
        this.user = googleUser.user;
      }).catch(err => {
        console.log(err.message, 'error in google login');
      });
      // await loading.dismiss();
    }

  }

  onLoginSuccessGoogle(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.afAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        this.isGoogleLogin = true;
        this.user = success.user;
        this.loadingController.dismiss();
      });

  }

  // Easy access for form fields
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
  }

  onLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.afAuth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(['/home']);
        // this.loading.dismiss();
      });

  }


  async facebookLogin() {
    if (this.platform.is('ios')) {
      this.fb.login(['email'])
        .then((response: FacebookLoginResponse) => {
          this.onLoginSuccess(response);
          console.log(response.authResponse.accessToken);
        }).catch((error) => {
          console.log(error);
          alert('error:' + error);
        });
    } else {
      this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(facebookUser => {
        var email = facebookUser["user"]["email"];
        var name = facebookUser["user"]["displayName"];
        var imageURL = facebookUser["user"]["photoURL"];
        try {
          var accountExist = false;
          let count: number = 0;
          let createUser: number = 0;
          this.userService.getAllUsersEmails()
            .subscribe(data => {
              // this.users = data;
              while (count <= data.length) {
                // console.log("intoWhileloop")
                if (email === data[count]) {
                  // console.log("UserEXISTS")
                  count += 1
                  accountExist = true;
                  this.analyticsService.logEventRoute(email);
                  this.analyticsService.logEventComments(email, "User Logging In");
                  this.router.navigate(['/home'])
                  break;
                } else {
                  // console.log("NO USER")
                  accountExist = false;
                  count += 1

                }
              }
              if (accountExist == false) {
                // console.log("goINACCOUNTEXISTfalse")

                if (createUser == 0) {
                  this.userService.createUser(email,
                    name,
                    "",
                    "User",
                    "active",
                    imageURL,
                    "")
                  this.beansRewardsService.createBeanWallet(email)
                  createUser += 1
                  // console.log("createUser")
                }
                accountExist = true;
                this.analyticsService.logEventRoute(email);
                  this.analyticsService.logEventComments(email, "User Logging In");
                this.router.navigate(['/home'])
              } else {
              }
            })
        } catch (err) {
          console.dir(err)

        }
      })
    }

  }

  async presentAlertPrompt() {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Reset Password',
        inputs: [
          {
            name: 'email',
            type: 'text',
            placeholder: 'Please input your email'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: data => {
              this.emailReset = data.email
              return resolve(this.emailReset)
            }
          }
        ]
      });

      await alert.present();
    })

  }

  async resetPassword() {
    await this.presentAlertPrompt();
    this.authService.sendPasswordResetEmail(this.emailReset)
    this.analyticsService.logEventRoute(this.emailReset);
    this.analyticsService.logEventComments(this.emailReset, "User Reset Password");
    this.presentAlert('Successful', 'We have sent an email to ' + this.emailReset)
  }


}
