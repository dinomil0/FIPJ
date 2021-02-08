import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-sign-out-modal',
  templateUrl: './sign-out-modal.page.html',
  styleUrls: ['./sign-out-modal.page.scss'],
})
export class SignOutModalPage implements OnInit {
  userType: any;
  isUsernBiz = false;
  isAdmin = false;

  constructor(private modalController: ModalController, 	private	authService:	AuthService, private router: Router,
    private userService: UserService) {
      this.userService.getUser().subscribe(user=>{
        for(var temp of user){
          this.userType = temp.type
        }
        if(this.userType == "User" || this.userType == "Business"){
          this.isUsernBiz = true;
          this.isAdmin = false;
        }
        else if(this.userType == "Admin"){
          this.isAdmin = true;
          this.isUsernBiz = false;
        }
      })
   }

  ngOnInit() {
  }

  signout() {
    // this.modalController.dismiss();
  
    this.authService.logout();
    
    this.router.navigate(['/login']);
  
    }

}
