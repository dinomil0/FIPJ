import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Beans } from '../shared/models/beans';
import { beansHistory } from '../shared/models/beansHistory';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';
import { BeansHistoryService } from '../shared/services/beans-history.service';
import { BeansRewardsService } from '../shared/services/beans-rewards.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-beans-rewards',
  templateUrl: './beans-rewards.page.html',
  styleUrls: ['./beans-rewards.page.scss'],
})
export class BeansRewardsPage implements OnInit {
  count = 0;
  public BeansClickDate: Date;
  email: string;
  beansHistory: beansHistory[];
  beans: Beans;
  beansObject: Beans;
  NoOfBeans: number;
  numberofbeans: number;
  minus: boolean;
  add: boolean;
  newBeans: number;
  beansArray: beansHistory[];
  dateArray: Date[] = [];
  latestDate: Date;
  currentdate: Date;
  type: string;
  isUser = false;
  isBusiness = false;
  uid: string;
  fewBeans = 10;
  someBeans = 19.50;
  manyBeans = 48;
  fewbeansQuantity = 1000;
  somebeansQuantity = 2000;
  manybeansQuantity = 5000;
  fewBeansPic = "assets/beans/few-beans.jpg"
  someBeansPic = "assets/beans/some-beans.jpg"
  manyBeansPic = "assets/beans/many-beans.jpg"

  constructor(private beansRewardsService: BeansRewardsService,
    private authService: AuthService,
    private beansHistoryService: BeansHistoryService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private userService: UserService,
    private router: Router,
    private analyticsService: AnalyticsService) {
      

  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();
    this.userService.getUser().subscribe(data => {
      for (var u in data){
        this.uid = data[u]["uid"]
        this.type = data[u]["type"]
        this.email = data[u]["email"]
      }
      this.beansRewardsService.getBeansById(this.email).then(bean => {
        this.uid = bean.id
      })
      this.userService.getUserById(this.uid).then(data => {
        this.type = data.type
        console.log(this.type, "UserType")
        if (this.type === "User") {
          this.isUser = true;
        } else {
          this.isUser = false;
        }
        if (this.type === 'Business') {
          this.isBusiness = true;
        } else {
          this.isBusiness = false;
        }
      })

      this.beansRewardsService.getBeans(this.email).subscribe(beans =>{
        console.log(beans)
        this.NoOfBeans = beans.beans;
      })

      this.beansRewardsService.getBeansById(this.email).then(beansObject => {
        // console.log(beansObject)
        this.beansArray = beansObject["beansHistory"]
        console.log(this.beansArray)
        // Get latest date
        this.latestDate = new Date(Math.max.apply(null, this.beansArray.map(function (e) {
          return new Date(e.date);
        })));
  
        this.currentdate = new Date();
        console.log(this.currentdate, "CurrentDATE")
  
        console.log(this.latestDate)
        if (this.latestDate != null &&
          this.latestDate.getFullYear() == new Date().getFullYear() &&
          this.latestDate.getMonth() == new Date().getMonth() &&
          this.latestDate.getDate() == new Date().getDate()) {
  
          var element = <HTMLInputElement>document.getElementById("BeansButton");
          element.disabled = true;
          //  console.log("buttonOff")
  
        } else {
          var element = <HTMLInputElement>document.getElementById("BeansButton");
          element.disabled = false;
        }
      })
  
  
      this.beansHistoryService.dailyCoin().subscribe(result =>
        this.beansHistory = result
      );
    })    
    loading.dismiss();
 
  }

  addBeans() {
    console.log(this.beansHistory)
    var element = <HTMLInputElement>document.getElementById("BeansButton");
    element.disabled = true;

    this.beansRewardsService.createBeanHistory(this.email, this.beansHistory).then(async beans => {

      const toast = await this.toastController.create({
        message: 'Added One Bean ' + this.email,
        duration: 2000,
        position: 'bottom',
        color: 'primary'
      });
      toast.present();

      this.beansRewardsService.getBeansById(this.email).then(beansObject => {
        this.NoOfBeans = beansObject.beans;
      })

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

      this.beansRewardsService.update(bean, this.email);
      // window.location.reload();
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " claimed one bean");

    })
  }

  checkout(beansPrice: number, beansQuantity: number, image: string){
    sessionStorage.setItem('beansPrice', beansPrice.toString());
    sessionStorage.setItem('beansQuantity', beansQuantity.toString());
    sessionStorage.setItem('imageURL', image);
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " is checking out " + beansQuantity + " beans");
    this.router.navigate(['/checkout'])
  }

  routebeansHistory(){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into Beans History");
    this.router.navigate(['/beans-history'])
  }

}
