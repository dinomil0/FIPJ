import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-out-modal',
  templateUrl: './sign-out-modal.page.html',
  styleUrls: ['./sign-out-modal.page.scss'],
})
export class SignOutModalPage implements OnInit {

  constructor(private modalController: ModalController, 	private	authService:	AuthService, private router: Router) {
  
   }

  ngOnInit() {
  }

  signout() {
    // this.modalController.dismiss();
  
    this.authService.logout();
    
    this.router.navigate(['/login']);
  
    }

}
