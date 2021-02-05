import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CardsSelectPage } from '../cards-select/cards-select.page';
import { CardsPage } from '../cards/cards.page';
import { Beans } from '../shared/models/beans';
import { beansHistory } from '../shared/models/beansHistory';
import { Cards } from '../shared/models/cards';
import { transactionHistory } from '../shared/models/transactionHistory';
import { BeansHistoryService } from '../shared/services/beans-history.service';
import { BeansRewardsService } from '../shared/services/beans-rewards.service';
import { CardsService } from '../shared/services/cards.service';
import { TransactionHistoryService } from '../shared/services/transaction-history.service';
import { UserService } from '../shared/services/user.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { AnalyticsService } from '../shared/services/analytics.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  transactionHistoryArray: transactionHistory[];
  uid: string;
  email: string;
  NoOfBeans: number;
  newBeans: number;
  beansHistory: beansHistory[];
  add: boolean;
  minus: boolean;
  numberofbeans: number;

  cardArray: Cards[];
  cardCheck: boolean;
  currentCard: Cards;
  cardType: string;
  cardNum: string;

  
  paymentAmount: string = "10.00";
  currency: string = 'SGD';
  currencyIcon: string = '$';

  paidFor = false;
  type: any;

  constructor(private router:Router,private payPal: PayPal, private cardsService: CardsService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private transactionHistoryService: TransactionHistoryService,
    private userService: UserService,
    private beansRewardsService: BeansRewardsService,
    private beansHistoryService: BeansHistoryService,
    private alertController: AlertController,
    private analyticsService: AnalyticsService) {
      this.userService.getUser().subscribe(data => {
        for (var u in data) {
          this.uid = data[u]["uid"]
          this.email = data[u]["email"]
          this.type = data[u]["type"]
        }
        //Get Beans
        this.beansRewardsService.getBeansById(this.email).then(beansObject => {
          this.NoOfBeans = beansObject.beans;
        })
      })
      this.transactionHistoryService.buyingGreenITbeans().subscribe(result => {
        this.transactionHistoryArray = result
        console.log(this.transactionHistoryArray)
      });
  
      this.beansHistoryService.buyCoin().subscribe(result =>
        this.beansHistory = result
      );

    setTimeout(()=>{
      <any>window['paypal'].Buttons({
        createOrder: (data,actions)=>{
          return actions.order.create({
            purchase_units:[{
              amount:{
                currency_code: 'SGD',
                value: this.paymentAmount
              }
            }]
          });
        },
        onApprove: function(data,actions){
          return actions.order.capture().then(function (details){
            alert('Transaction completed by'+details.payer.name.given_name+'!');
          })
          .catch(err=>{
            console.log(err);
          })
        }
      }).render('#paypal-button-container');
    },500)
    
    
   }

   async ngOnInit() {
    this.cardType = ''
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();
    this.cardsService.getCardByUser()
    .subscribe(data => {
      this.cardArray = data;
      for(let i of this.cardArray){
        if (i.selected == true){
          this.currentCard = i
          this.cardNum = i.cardNum.substr(-4)
          if(this.currentCard.cardNum.charAt(0) == '5'){
            this.cardType = 'Mastercard'
          }
          else{
            this.cardType = 'Visa'
          }
        }
      }
      if (this.cardArray != null){
        loading.dismiss();
      }
      if (this.cardArray.length == 0){
        this.cardCheck = false;
      }
      else {
        this.cardCheck = true;
      }
    });
  }

  async addCards() {
    const modal = await this.modalController.create({
    component: CardsPage
    });
    return await modal.present();
  }

  async selectCards() {
    const modal = await this.modalController.create({
    component: CardsSelectPage
    });
    return await modal.present();
  }

  pay() {
    let beansPrice = sessionStorage.getItem('beansPrice');
    let beansQuantity = sessionStorage.getItem('beansQuantity');
    let image = sessionStorage.getItem('imageURL');

    if (beansPrice && beansQuantity != null) {
      try {
        for (var temp in this.transactionHistoryArray) {
          this.transactionHistoryArray[temp]["quantity"] = Number(beansQuantity)
          this.transactionHistoryArray[temp]["price"] = Number(beansPrice)
        }
        for (var temp in this.beansHistory) {
          this.beansHistory[temp]["numberofbeans"] = Number(beansQuantity)
          this.beansHistory[temp]["image"] = image
        }
        //Create TransactionHistory
        this.userService.createTransactionHistory(this.uid, this.transactionHistoryArray)

        //Create beansHistory
        for (let history in this.beansHistory) {
          this.add = this.beansHistory[history]["add"]
          this.minus = this.beansHistory[history]["minus"]
          this.numberofbeans = this.beansHistory[history]["numberofbeans"]
          if (this.add == true) {
            this.newBeans = this.NoOfBeans + this.numberofbeans
          } else {
            this.newBeans = this.NoOfBeans - this.numberofbeans
          }
        }
        const bean = new Beans(this.newBeans)
        this.beansRewardsService.createBeanHistory(this.email, this.beansHistory)
        //Update NoofBeans
        this.beansRewardsService.update(bean, this.email);
        //Alert
        this.presentAlert('Success!', 'You have successfully buy the beans')
        this.analyticsService.logEventRoute(this.email);
        this.analyticsService.logEventComments(this.email, this.type+ " successfully checkout");
        this.router.navigate(['/beans-rewards'])
      } catch {

      }
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

 
}
