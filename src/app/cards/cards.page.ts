import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import	firebase	from	'firebase/app';	
import	'firebase/auth';
import { Observable } from 'rxjs';
import { Cards } from '../shared/models/cards';
import { User } from '../shared/models/user';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';
import { CardsService } from '../shared/services/cards.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  cardForm: FormGroup;
  textNumber: string;
  textExpiration:string;
  users: User[];
  cardArray: Cards[];
  uid: string;
  cardType = '';
  type: string;
  email: any;
  
  constructor(
    private cardsService: CardsService,
    private modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
    private analyticsService: AnalyticsService) {

    this.cardForm = new FormGroup({
      cardNumber: new FormControl(''),
      cardName: new FormControl(''),
      cardExpiration: new FormControl(''),
      cardCVV: new FormControl('')
      });
    }

  ngOnInit() {
    this.cardsService.getCardByUser()
    .subscribe(data => {
      this.cardArray = data;
    });
  }

  cardNum(event){
    const textNumber = event.target.value;
    if(textNumber.length == 4){
      this.textNumber = textNumber + " "
    }
    if(textNumber.length == 9){
      this.textNumber = textNumber + " "
    }
    if(textNumber.length == 14){
      this.textNumber = textNumber + " "
    }
    if(textNumber.charAt(0) == 5){
      this.cardType = "mastercard"
    }
    else if(textNumber.charAt(0) == 4){
      this.cardType = "visa"
    }
    else {
      this.cardType = ""
    }
  }

  expiration(event){
    const textExpiration = event.target.value;
    if(textExpiration.length == 2){
      this.textExpiration = textExpiration + "/"
    }
  }

  add(){
    this.authService.observeAuthState(UserProfile => {
      this.userService.getAllUsers()
        .subscribe(data => {
          this.users = data;
          for (var user in this.users) {
            if (UserProfile.email == this.users[user]["email"]) {
              this.uid = this.users[user]["uid"]
              this.email = this.users[user]["email"]
              this.type = this.users[user]["type"]
              console.log("Users", this.uid)
            } else {
              continue;
            }
          }
          this.userService.getUserById(this.uid).then(userData => {
            let user = new User(userData.email, userData.username, userData.password, userData.type, userData.status, userData.imageURL, userData.uen)
            console.log(userData)
            console.log(this.uid)
            let dbItems = firebase.firestore().collection('users/' + this.uid + '/cards');
            let card = new Cards(
              this.cardForm.value.cardNumber,
              this.cardForm.value.cardName,
              this.cardForm.value.cardExpiration,
              this.cardForm.value.cardCVV,
              userData.email,
              false
            )
            dbItems.doc().set({
              cardNumber: card.cardNum,
              cardName: card.cardName,
              cardExpiration: card.cardExpiration,
              cardCVV: card.CVV,
              cardOwner: card.owner,
              selected: false
            });
            this.analyticsService.logEventRoute(this.email);
            this.analyticsService.logEventComments(this.email, this.type+ " added a card");
          })
        })
    })
    

    this.closeModal();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
