import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.page.html',
  styleUrls: ['./registration-modal.page.scss'],
})
export class RegistrationModalPage implements OnInit {

  constructor(private modalController: ModalController,
    private router: Router) { }

  ngOnInit() {
  }

  clickUser() {
    
    this.modalController.dismiss();
    this.router.navigate(['/registration'])
    }

  clickBusiness() {  
    this.modalController.dismiss();
    this.router.navigate(['/registration-business'])
    }

}
