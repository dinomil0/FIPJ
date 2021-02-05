import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CardsPage } from '../cards/cards.page';
import { Cards } from '../shared/models/cards';
import { Product } from '../shared/models/products';
import { AnalyticsService } from '../shared/services/analytics.service';
import { CardsService } from '../shared/services/cards.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-cards-select',
  templateUrl: './cards-select.page.html',
  styleUrls: ['./cards-select.page.scss'],
})
export class CardsSelectPage implements OnInit {
  cardArray: Cards[];
  cardSelected: Cards;
  userId: string;
  cardNum: string;
  email: any;
  type: any;

  constructor(
    private cardsService: CardsService,
    private userService: UserService,
    private modalController: ModalController,
    private router: Router,
    private analyticsService: AnalyticsService) { 
      this.userService.getUser()
      .subscribe(data => {
        for (let i of data){
          this.userId = i.uid
          this.email = i.email
          this.type = i.type
        }
      })
    }

  ngOnInit() {
    this.cardsService.getCardByUser()
    .subscribe(data => {
      this.cardArray = data;
    });
  }

  async addCards() {
    const modal = await this.modalController.create({
    component: CardsPage
    });
    return await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  clickCard(c: Cards) {
    this.cardNum = c.cardNum
    this.cardSelected = c
  }

  selectCard() {
    this.cardsService.updateCard(this.cardSelected.id, this.userId, true)
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " selected a card");
    this.modalController.dismiss();
  }
}
