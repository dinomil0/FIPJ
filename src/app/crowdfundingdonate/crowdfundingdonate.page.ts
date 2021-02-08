import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { data } from 'jquery';
import { async } from 'rxjs/internal/scheduler/async';
import { Crowdfunding } from '../shared/models/crowdfunding';
import { CrowdfundingService } from '../shared/services/crowdfunding.service';
import { TransactionHistoryService } from '../shared/services/transaction-history.service';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-crowdfundingdonate',
  templateUrl: './crowdfundingdonate.page.html',
  styleUrls: ['./crowdfundingdonate.page.scss'],
})
export class CrowdfundingdonatePage implements OnInit {
  donateForm: FormGroup;
  crowdId: string;
  crowdFunding: Crowdfunding;
  crowdFundingName: string;
  crowdFundingImage: string;
  receiveAmt: number;
  goalAmt: number;
  crowdecoRating: number;
  crowdFundingDesc: string;
  crowdFundingEmail: string;
  userType: string;
  isUser: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  crowdUsername: string;
  crowdStatus: string;
  uid: any;
  transactionHistoryArray: any[] = [];
  raisedFor: string;
  nameProduct: string;
  crowdImagePath: string;
  BusinesstransactionHistoryArray: any[] = [];
  bizid: any;
  crowdFundingImagePath: string;


  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
      return ({ positiveNumber: true });
    } else {
      return (null);
    }
  }


  constructor(private toastController: ToastController, private router: Router,
    private activatedRoute: ActivatedRoute,
    private crowdfundingService: CrowdfundingService,
    private userService: UserService,
    private transactionHistoryService: TransactionHistoryService,
    private alertController: AlertController) {

    this.crowdId = this.activatedRoute.snapshot.params.id;
    this.donateForm = new FormGroup({
      donateAmt: new FormControl(0, [CrowdfundingdonatePage.positiveNumber]),
    });

    this.transactionHistoryService.usercheckoutSuccess().subscribe(result => {
      this.transactionHistoryArray = result
    });

    this.transactionHistoryService.businesscheckoutSuccess().subscribe(result => {
      this.BusinesstransactionHistoryArray = result
    });


    this.crowdfundingService.getCrowdfundingById(this.crowdId).subscribe(data => {
      this.crowdFunding = data;
      this.crowdUsername = this.crowdFunding.username;
      this.crowdFundingImage = this.crowdFunding.image;
      this.crowdFundingImagePath = this.crowdFunding.imagePath;
      this.crowdFundingName = this.crowdFunding.nameProduct;
      this.receiveAmt = this.crowdFunding.receiveAmt;
      this.crowdecoRating = this.crowdFunding.ecoRating;
      this.crowdFundingDesc = this.crowdFunding.description;
      this.crowdFundingEmail = this.crowdFunding.userEmail;
      this.goalAmt = this.crowdFunding.goalAmt;
      this.crowdStatus = this.crowdFunding.status;

      this.userService.getAllUsers().subscribe(userEmails => {
        for (var temp of userEmails) {
          if (temp.email == this.crowdFundingEmail) {
            this.bizid = temp.uid
          }
        }
        console.log(this.bizid)
      })
    });



    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.userType = data[u]["type"]
        this.uid = data[u]["uid"]
      }
      if (this.userType === "User") {
        this.isUser = true;
      } else {
        this.isUser = false;
      }
      if (this.userType === 'Business') {
        this.isBusiness = true;
      } else {
        this.isBusiness = false;
      }
      if (this.userType === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    })

    let _this = this;
    setTimeout(() => {
      <any>window['paypal'].Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'SGD',
                value: this.donateForm.value.donateAmt
              }
            }]
          });
        },

        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            console.log(_this.crowdFunding)
            _this.crowdfundingService.donateUpdate(_this.crowdFunding, _this.donateForm.value.donateAmt)

            // Business TranactionHistory Creating
            for (var temp in _this.crowdFunding) {
              _this.raisedFor = _this.crowdFunding.username
              _this.nameProduct = _this.crowdFunding.nameProduct
              for (var index in _this.BusinesstransactionHistoryArray) {
                _this.BusinesstransactionHistoryArray[index]["name"] = _this.crowdFunding.nameProduct
                // _this.BusinesstransactionHistoryArray[index]["description"] = "Raise from Crowd-Funding"
                console.log(_this.BusinesstransactionHistoryArray[index]["description"])
                _this.BusinesstransactionHistoryArray[index]["quantity"] = 1
                _this.BusinesstransactionHistoryArray[index]["image"] = _this.crowdFundingImagePath
                // console.log(_this.donateForm.value.donateAmt, "inForLoop")
                _this.BusinesstransactionHistoryArray[index]["price"] = _this.donateForm.value.donateAmt
              }             
            }
            console.log(_this.BusinesstransactionHistoryArray, "business")
            // Business TransactionHistory Append
            _this.userService.createTransactionHistory(_this.bizid, _this.BusinesstransactionHistoryArray)
            // User TranactionHistory Creating
            for (var temp in _this.crowdFunding) {
              _this.raisedFor = _this.crowdFunding.username
              _this.nameProduct = _this.crowdFunding.nameProduct
              for (var index in _this.transactionHistoryArray) {
                _this.transactionHistoryArray[index]["name"] = _this.crowdFunding.nameProduct
                // _this.transactionHistoryArray[index]["description"] = "Crowd-Funding Purchase"
                _this.transactionHistoryArray[index]["quantity"] = 1
                _this.transactionHistoryArray[index]["image"] = _this.crowdFundingImagePath
                // console.log(_this.donateForm.value.donateAmt, "inForLoop")
                _this.transactionHistoryArray[index]["price"] = _this.donateForm.value.donateAmt
              }
              
            }
            console.log(_this.transactionHistoryArray, "user")
            // User TransactionHistory Append
            _this.userService.createTransactionHistory(_this.uid, _this.transactionHistoryArray)
            _this.donateForm.reset();

            _this.presentAlert("Successful", "You have successfully donated to " + _this.raisedFor + " for its " + _this.nameProduct)
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
          tagline: 'false'
        }
      }).render('#paypal-button-container');
    }, 500)


  }

  ngOnInit() {


  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
  }
  
  approveListing(){
    this.crowdfundingService.approveListing(this.crowdFunding);
    this.router.navigate(['/crowdfunding-pending']);
    
  }

  deleteListing(){
    this.crowdfundingService.delete(this.crowdFunding);
    this.router.navigate(['/crowdfunding-pending'])
  }

  buttonAd5Dol() {
    this.donateForm.controls.donateAmt.setValue(5);
  }

  buttonAd10Dol() {
    this.donateForm.controls.donateAmt.setValue(10);
  }

  buttonAd20Dol() {
    this.donateForm.controls.donateAmt.setValue(20);
  }

  buttonAd50Dol() {
    this.donateForm.controls.donateAmt.setValue(50);
  }

  buttonAd100Dol() {
    this.donateForm.controls.donateAmt.setValue(100);
  }

  editCrowdfunding(id) {
    this.router.navigate(['/crowdfunding-edit', id]);
  }



  
}
