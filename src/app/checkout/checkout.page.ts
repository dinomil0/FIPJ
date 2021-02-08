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
import { CartService } from '../shared/services/cart.service';
import { data } from 'jquery';
import { Cart } from '../shared/models/cart';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { ProductService } from '../shared/services/product.service';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  transactionHistoryArray: transactionHistory[] = [];
  MPtransactionHistoryArray: any[] = [];
  BusinesstransactionHistoryArray: any[] = [];
  uid: string;
  email: string;
  NoOfBeans: number;
  beanDiscount: number;
  newBeans: number;
  beansHistory: beansHistory[];
  spentBeansHistory: beansHistory[];
  add: boolean;
  minus: boolean;
  numberofbeans: number;

  isUser = false;

  cartItem: Cart[];
  totalPrice: number;
  cartCount: number;
  discountedPrice: number;

  userObj: any;

  cardArray: Cards[];
  cardCheck: boolean;
  currentCard: Cards;
  cardType: string;
  cardNum: string;

  isChecked: any;

  paymentAmount: string = "10.00";
  currency: string = 'SGD';
  currencyIcon: string = '$';

  paidFor = false;
  type: any;

  beanName: any;
  beansPrice: any;
  beansQuantity: any;
  beanImage: any;

  beanForm: FormGroup;

  constructor(private router: Router, private payPal: PayPal, private cardsService: CardsService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private transactionHistoryService: TransactionHistoryService,
    private userService: UserService,
    private beansRewardsService: BeansRewardsService,
    private beansHistoryService: BeansHistoryService,
    private alertController: AlertController,
    private analyticsService: AnalyticsService,
    private cartService: CartService,
    private productservice: ProductService,
  ) {
    this.isChecked = document.getElementById("switchValue") as HTMLInputElement;
    this.beanForm = new FormGroup({ toggle: new FormControl(false) })
    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.uid = data[u]["uid"]
        this.email = data[u]["email"]
        this.type = data[u]["type"]
      }
      this.cartService.getTotalPrice().subscribe(data => {
        this.totalPrice = Number(data)
      })
      this.beansRewardsService.getBeansById(this.email).then(beansObject => {
        this.NoOfBeans = beansObject.beans;
        this.beanDiscount = this.NoOfBeans / 100
        console.log(this.beanDiscount)
        this.discountedPrice = this.totalPrice - this.beanDiscount
      })
      if (this.type == 'User') {
        this.isUser = true

      } else {
        // For beans
        this.beansPrice = sessionStorage.getItem('beansPrice');
        this.beansQuantity = sessionStorage.getItem('beansQuantity');
        this.beanImage = sessionStorage.getItem('imageURL');
        if (this.beansQuantity == "1000") {
          this.beanName = "A Few Beans"
        }
        else if (this.beansQuantity == "2000") {
          this.beanName = "Some Beans"
        }
        else {
          this.beanName = "Many Beans"
        }
      }

      //Get Beans

    })
    this.transactionHistoryService.buyingGreenITbeans().subscribe(result => {
      this.transactionHistoryArray = result
      console.log(this.transactionHistoryArray)
    });

    this.beansHistoryService.buyCoin().subscribe(result =>
      this.beansHistory = result
    );
    this.beansHistoryService.usedCoin().subscribe(result =>
      this.spentBeansHistory = result
    );
    let _this = this;
    setTimeout(() => {
      <any>window['paypal'].Buttons({
        createOrder: (data, actions) => {
          if (this.beanForm.value.toggle) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  currency_code: 'SGD',
                  value: this.discountedPrice
                }
              }]
            });
          }
          else {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  currency_code: 'SGD',
                  value: this.totalPrice
                }
              }]
            });
          }
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {

            // alert('Transaction completed by' + details.payer.name.given_name + '!');
            _this.checkOut()
            if (_this.beanForm.value.toggle) {
              _this.beansRewardsService.getBeansById(_this.email).then(beansObject => {
                let beforeBeans = beansObject.beans
                beansObject.beans = beansObject.beans - beansObject.beans
                _this.beansRewardsService.update(beansObject, _this.email)

                _this.spentBeansHistory.forEach(element => {
                  element.numberofbeans = beforeBeans
                  console.log(element.numberofbeans)
                });
                _this.beansRewardsService.createBeanHistory(_this.email, _this.spentBeansHistory)
              })
            }
            _this.analyticsService.logEventRoute(_this.email);
            _this.analyticsService.logEventComments(_this.email, _this.type + " successfully checkout with paypal");
            _this.presentAlert("Successful", "You have successfully checkout").then(data => { _this.router.navigate(['marketplace-tabs/home']) })
            // i need this part here to create a transaction, name as "Crowdfunding Transaction #----", 
            // description as "funded this.crowdFundingName for this.crowdUsername", 
            // then the quantity can just put 1 and price as the formvalue.donateamt 
          })
            .catch(err => {
              console.log(err);
            })
        },
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'checkout',
          tagline: 'false',
          height: 36
        }

      }).render('#paypal-button-container');
    }, 500)
  }

  async ngOnInit() {
    this.cardType = ''
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();


    //get cart items
    this.userService.getUserCart().subscribe(cart => {
      this.cartItem = cart
    })



    console.log(this.totalPrice)
    this.userService.getUserInstant().subscribe(data => {
      this.userObj = data
    })

    this.cartService.getCountOfProductInCart().subscribe(data => { this.cartCount = Number(data) })

    this.cardsService.getCardByUser()
      .subscribe(data => {
        this.cardArray = data;
        for (let i of this.cardArray) {
          if (i.selected == true) {
            this.currentCard = i
            this.cardNum = i.cardNum.substr(-4)
            if (this.currentCard.cardNum.charAt(0) == '5') {
              this.cardType = 'Mastercard'
            }
            else {
              this.cardType = 'Visa'
            }
          }
        }
        if (this.cardArray != null) {
          loading.dismiss();
        }
        if (this.cardArray.length == 0) {
          this.cardCheck = false;
        }
        else {
          this.cardCheck = true;
        }
      });

  }

  checkOut() {
    for (let item in this.cartItem) {
      console.log(this.cartItem[item])
      let transObjP = new transactionHistory(this.cartItem[item].name,
        "Marketplace Purchase",
        this.cartItem[item].quantity,
        new Date(),
        this.cartItem[item].price,
        this.cartItem[item].imgURL,
        this.cartItem[item].productID
      )
      let transObjS = new transactionHistory(this.cartItem[item].name,
        "Marketplace Sold",
        this.cartItem[item].quantity,
        new Date(),
        this.cartItem[item].price,
        this.cartItem[item].imgURL,
        this.cartItem[item].productID
      )
      this.productservice.getProductById(this.cartItem[item].productID).then(prodData => {
        this.userService.getAllUsers().subscribe(sellerData => {
          for (const seller of sellerData) {
            if (seller.email == prodData.seller) {
              
              this.BusinesstransactionHistoryArray = [transObjS]
              console.log(this.BusinesstransactionHistoryArray)
              this.userService.createTransactionHistory(seller.uid, this.BusinesstransactionHistoryArray)
            }
          }
        })
      })
      this.userService.getUser().subscribe(user => {
        user.forEach(element => {
          
          this.MPtransactionHistoryArray = [transObjP]
          this.userService.createTransactionHistory(element.uid, this.MPtransactionHistoryArray)
        });
        this.cartService.delete(this.cartItem[item].productID)
      })
    }
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

  // Payment for beans
  pay() {
    if (!this.isUser) {
      if (this.beansPrice && this.beansQuantity != null) {
        try {
          for (var temp in this.transactionHistoryArray) {
            this.transactionHistoryArray[temp]["quantity"] = Number(this.beansQuantity)
            this.transactionHistoryArray[temp]["price"] = Number(this.beansPrice)
          }
          for (var temp in this.beansHistory) {
            this.beansHistory[temp]["numberofbeans"] = Number(this.beansQuantity)
            this.beansHistory[temp]["image"] = this.beanImage
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
          this.presentAlert('Success!', 'You have successfully checkout')
          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type + " successfully checkout");
          this.router.navigate(['/beans-rewards'])
        } catch {
        }
      }
    }
    //is user
    else {
      this.checkOut()
      if (this.beanForm.value.toggle) {
        this.beansRewardsService.getBeansById(this.email).then(beansObject => {
          console.log(beansObject)
          let beforeBeans = beansObject.beans
          beansObject.beans =  beansObject.beans - beansObject.beans
          this.beansRewardsService.update(beansObject, this.email)

          this.spentBeansHistory.forEach(element => {
            element.numberofbeans = beforeBeans
            console.log(element.numberofbeans)
          });
          this.beansRewardsService.createBeanHistory(this.email, this.spentBeansHistory)
        })
      }
      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, this.type + " successfully checkout");
      this.router.navigate(['marketplace-tabs/home'])
      this.presentAlert('Success!', 'You have successfully checkout')
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
