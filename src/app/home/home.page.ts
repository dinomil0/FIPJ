import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { AcraService } from '../shared/services/acra.service';
import { Acra } from '../shared/models/acra';
import { AlertController, ModalController } from '@ionic/angular';
import { CarbonFootprintPage } from '../carbon-footprint/carbon-footprint.page';
import { Plugins } from '@capacitor/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { BeansRewardsService } from '../shared/services/beans-rewards.service';
import { CarbonFootprintService } from '../shared/services/carbon-footprint.service';
import { carbonFootprint } from '../shared/models/carbonFootprint';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isUser = false;
  isBusiness = false;
  isAdmin = false;
  username: string;
  users: User[];
  type: string;
  acraData = [];
  wishList: User;
  acraArray: Acra[] = [];
  uid: string;
  userImage: string;
  userUsername: string;
  email: string;
  NoOfBeans: any;
  countTodisableButton = 0;
  carbonFootprintArray: carbonFootprint[];
  reportId: any;

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    public acraService: AcraService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private analyticsService: AnalyticsService,
    private beansRewardsService: BeansRewardsService,
    private carbonFootprintService: CarbonFootprintService,
    private alertController: AlertController) {
    // var user = this.authService.getCurrentUser()
    // if (user != null) {
    //   this.email = user.email
    //   this.analyticsService.setUser(user.uid)
    //   
    // } else {
    //   this.router.navigate(['/login'])
    // }

    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.uid = data[u]["uid"]
        this.type = data[u]["type"]
        this.email = data[u]["email"]
        this.username = data[u]["username"]
        this.userImage = data[u]["imageURL"]
        this.userUsername = data[u]["username"]
        this.reportId = data[u]["reportId"]
        console.log(this.reportId)
      }
      this.beansRewardsService.getBeans(this.email).subscribe(beans =>{
            this.NoOfBeans = beans.beans;
            console.log(this.NoOfBeans)
          })
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
      if (this.type === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      

    })
  };


  ngOnInit() {

  }


  async carbonFootprint() {
    this.userService.getBusinessCarbonFootprint(this.uid).then(async data =>{
      for (var index in data.carbonFootprint){
        if(data.carbonFootprint[index] != null){
          this.countTodisableButton += 1
        }
      }
      if(this.countTodisableButton > 0){
        this.router.navigate(['/carbon-footprint-summary'])
      }else{
        const modal = await this.modalController.create({
          component: CarbonFootprintPage
        });
        return await modal.present();
      }

    })  
}

  marketplace(){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " clicked into Marketplace");
    this.router.navigate(['/marketplace-tabs'])
  }

  education(){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ "User clicked into education forum");
    this.router.navigate(['/educationtabs'])
  }

  crowdfuding(){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " clicked into Crowdfunding");
    this.router.navigate(['/crowdfundingtabs'])
  }

  cards(){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " clicked into Cards");
    this.router.navigate(['/cards'])
  }

  beans(){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " clicked into Rewards");
    this.router.navigate(['/beans-rewards'])
  }

  sasva(){
    if(this.reportId != undefined){
      var win = window.open("http://vi.accessanywhere.io/links/resources/report?uri=%2Freports%2Freports%"+ this.reportId +"&page=vi313", '_blank');
      win.focus();
    }else{
      this.presentAlert("No report", "Please come back later.")
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
