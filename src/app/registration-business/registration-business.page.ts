import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { map, take, debounceTime } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { AcraService } from '../shared/services/acra.service';
import { BeansRewardsService } from '../shared/services/beans-rewards.service';

@Component({
  selector: 'app-registration-business',
  templateUrl: './registration-business.page.html',
  styleUrls: ['./registration-business.page.scss'],
})
export class RegistrationBusinessPage implements OnInit {
  signupForm: FormGroup;
  signupError: any;
  categories: string[];
  ishidden: false;
  replytype: any;
  showPassword = false;
  passwordToggleIcon = "eye";
  acraData: any;
  selectOption: any;
  validBusiness = false;
  disableSelector = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    public afStore: AngularFirestore,
    public acraService: AcraService,
    private beansRewardsService: BeansRewardsService,
    private modalController: ModalController) {
      this.categories = ['User', 'Business'];


      //Get saved list of students
      this.acraService.getList().subscribe(response => {
        // console.log(response);
        this.acraData = response;
        console.log(this.acraData, "testing123")
  
      })
     }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      category: ['Business', [Validators.required]],
      uen: ['']
    });

    document.getElementById('user').style.display = "none";
    document.getElementById('business').style.display = "block";
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
  }

  async signup() {
    const loading = await this.loadingController.create();
    await loading.present();

    // if this.signupform.value.uen == data[count]["email"]
    try {
      var accountExist = false;
      let count: number = 0;
      let createUser: number = 0;
      this.userService.getAllUsersEmails()
        .subscribe(data => {
          while (count <= data.length) {
            console.log(data[count])
            if (this.signupForm.value.email === data[count]) {
              count += 1
              accountExist = true;
              this.presentAlert('Failed', 'Email have been registered')
              break;
            } else {
              console.log("NO USER")
              accountExist = false;
              count += 1

            }
          }
          if (accountExist == false) {
            // console.log("goINACCOUNTEXISTfalse")
              if (this.signupForm.value.category == "User") {
                if (createUser == 0){
                  const res = this.authService.signup(this.signupForm.value.email, this.signupForm.value.password)

                  this.userService.createUser(this.signupForm.value.email,
                    this.signupForm.value.username,
                    this.signupForm.value.password,
                    this.signupForm.value.category,
                    "active", "", "")
                  console.log("createUser")
  
                  this.beansRewardsService.createBeanWallet(this.signupForm.value.email)
                  accountExist = true;
                  count +=1
                  createUser+=1
                  // this.authService.sendVerficationEmail()
                  this.router.navigate(['/login'])
                  this.presentAlert('Success', 'You are registered')
                }
                
                
                
              } else {
                for (let test of this.acraData) {
                  if (this.signupForm.value.username.toLowerCase().replace(/\s/g, "") == test.name.toLowerCase().replace(/\s/g, "") &&
                    this.signupForm.value.uen.toLowerCase().replace(/\s/g, "") == test.uen.toLowerCase().replace(/\s/g, "")) {
                    this.validBusiness = true;
                    break;
                  } else {
                    this.validBusiness = false;
                    continue;
                  }
                }
                if (createUser == 0){
                  if (this.validBusiness == true) {
                    const res = this.authService.signup(this.signupForm.value.email, this.signupForm.value.password)
  
                    const create = this.userService.createUser(this.signupForm.value.email,
                      this.signupForm.value.username,
                      this.signupForm.value.password,
                      this.signupForm.value.category,
                      "active",
                      "",
                      this.signupForm.value.uen,
                      )
                      this.beansRewardsService.createBeanWallet(this.signupForm.value.email)
                      accountExist = true;
                      count +=1 
                      createUser+=1
                    if (create) {
                      // await loading.dismiss();
                      this.authService.sendVerficationEmail()
                      this.router.navigate(['/login'])
                      this.presentAlert('Success', 'You are registered')
  
                    } else {
                      this.presentAlert('Invalid', 'Company Name Or UEN is wrong')
                    }
                  }else {
                    this.presentAlert('Invalid', 'Company Name Or UEN is wrong')
                  }
                }
                 else {

                }
              }
              // accountExist = true;
              // this.router.navigate(['/home'])
              // count +=1
            
          }

        })
      await loading.dismiss();
    }

    catch (err) {
      // console.dir(err)
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: 'Please try again',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }



  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }

  }

  get email() {
    return this.signupForm.get('email');
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get uen() {
    return this.signupForm.get('uen');
  }

}
