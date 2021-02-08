import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from '../shared/models/user';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-edit-accounts',
  templateUrl: './edit-accounts.page.html',
  styleUrls: ['./edit-accounts.page.scss'],
})
export class EditAccountsPage implements OnInit {
  userId: string;
  user: User;
  userImage: string;
  editUserForm: FormGroup;
  statusArray: string[];
  status: string;
  email: string;
  type: string;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private analyticsService: AnalyticsService) {

    this.userId = this.route.snapshot.params.id;

    this.user = new User('', '', '', '', '', '', '', '', '');

    this.statusArray = ['active', 'deactivated', 'locked'];
    this.editUserForm = new FormGroup({
      email: new FormControl(this.user.email),
      username: new FormControl(this.user.username, [Validators.required]),
      password: new FormControl(this.user.password),
      type: new FormControl(this.user.type),
      status: new FormControl(this.user.status)
    });

    this.userService.getUserById(this.userId).then(data => {
        this.user = data;
        if (this.user) {
          this.userImage = this.user.imageURL;
          this.status = this.user.status;
          this.editUserForm.controls.email.setValue(this.user.email);
          this.editUserForm.controls.username.setValue(this.user.username);
          this.editUserForm.controls.password.setValue('');
          this.editUserForm.controls.type.setValue(this.user.type);
          this.editUserForm.controls.status.setValue(this.user.status);       
         }
         this.email = this.user.email
         this.type = this.user.type
      });
      

  }
  statusSelected(){
    switch(this.status)
    {
      case "active": 
      this.status="active";
      break;
      case "deactivated": 
      this.status="deactivated";
      break;
      case "locked": 
      this.status="locked";
      break;
    }
  }

  ngOnInit() {
  }

  update() {
    
    if (this.editUserForm.valid) {
      this.userService.update(this.userId, this.editUserForm.value.username ,this.editUserForm.value.status);

      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, this.type+ " updated profile");
      this.router.navigate(['tabs/tab3']);
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

  resetpassword(){
    this.authService.sendPasswordResetEmail(this.email)
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " reset password");
    this.presentAlert('Successful', 'We have sent an email to ' + this.email)
  }



}
