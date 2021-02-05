import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from '../shared/models/user';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-users-profile-edit',
  templateUrl: './users-profile-edit.page.html',
  styleUrls: ['./users-profile-edit.page.scss'],
})
export class UsersProfileEditPage implements OnInit {
  userId: string;
  user: User;
  editUserProfile: FormGroup;
  uen: string;
  userImage: string;
  email: string;
  type: string;


  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private analyticsService: AnalyticsService) { 

    this.userId = this.route.snapshot.params.uid;
    this.user = new User('', '', '', '', '', '', '', '','');

    this.editUserProfile = new FormGroup({
      email: new FormControl(this.user.email),
      password: new FormControl(this.user.password),
      username: new FormControl(this.user.username, [Validators.required]),
      type: new FormControl(this.user.type),
      status: new FormControl(this.user.status),
      address: new FormControl(this.user.shippingAddress),
      bio: new FormControl(this.user.bio)
    });

    this.userService.getUserById(this.userId).then(data => {
      this.user = data;
      // console.log(this.userId )
      if (this.user) {
        this.userImage = this.user.imageURL;
        this.editUserProfile.controls.email.setValue(this.user.email);
        this.editUserProfile.controls.username.setValue(this.user.username);
        this.editUserProfile.controls.password.setValue('');
        this.editUserProfile.controls.type.setValue(this.user.type);
        this.editUserProfile.controls.status.setValue(this.user.status);
        this.uen = this.user.uen      
        this.editUserProfile.controls.address.setValue(this.user.shippingAddress); 
        this.editUserProfile.controls.bio.setValue(this.user.bio); 
        this.email = this.user.email
        this.type = this.user.type
       }
    });

    
  }

  ngOnInit() {
  }


  updateUserProfile() {
    if (this.editUserProfile.valid) {
      const u = new User(
        this.editUserProfile.value.email,
        this.editUserProfile.value.username,
        this.editUserProfile.value.password,
        this.editUserProfile.value.type,
        this.editUserProfile.value.status,
        this.editUserProfile.value.imageURL, // No image
        this.uen,
        this.userId);
        u.shippingAddress = this.editUserProfile.value.address;
        u.bio = this.editUserProfile.value.bio;
     
      this.userService.updateUserProfile(u);
      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, this.type+ " updated profile");
      this.router.navigate(['users-profile']);
    }
  }

  resetpassword(){
    // console.log(this.email)
    this.authService.sendPasswordResetEmail(this.email)
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " reset password");
    this.presentAlert('Successful', 'We have sent an email to ' + this.email)
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
  }

 

}
