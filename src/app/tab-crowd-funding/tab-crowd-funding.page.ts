import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crowdfunding } from '../shared/models/crowdfunding';
import { AnalyticsService } from '../shared/services/analytics.service';
import { CrowdfundingService } from '../shared/services/crowdfunding.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-tab-crowd-funding',
  templateUrl: './tab-crowd-funding.page.html',
  styleUrls: ['./tab-crowd-funding.page.scss'],
})
export class TabCrowdFundingPage implements OnInit {
  crowdfundingListing :Crowdfunding[];
  allCrowdfunding : Crowdfunding[];
  userType: string;
  isUser : boolean;
  isBusiness : boolean;
  email: any;

  constructor(private crowdfundingService: CrowdfundingService,
    private userService: UserService,private router: Router,
    private analyticsService: AnalyticsService) { 

      this.userService.getUser().subscribe(data => {
        for (var u in data) {
            this.userType = data[u]["type"]
            this.email = data[u]["email"]
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
      })

    this.crowdfundingService.getApprovedCrowdListing()
    .subscribe(data => {
    this.crowdfundingListing = this.allCrowdfunding = data;
      console.log(this.crowdfundingListing)
   });




  }

  ngOnInit() {
  }

  search(event) {
    const text = event.target.value;
    console.log(text)
    if (text && text.trim() !== '') {
      this.allCrowdfunding = this.crowdfundingListing.filter(
        item => item.nameProduct.toLowerCase().includes(text.toLowerCase()));
    } 
    else {
      this.allCrowdfunding = this.crowdfundingListing;
    }
  }

  routeToDonate(id){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.userType+ " clicked into Crowdfunding Donation");
    this.router.navigate(['/crowdfundingdonate',id]);
  }

  createCrowdfundingListing(){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.userType+ " clicked into create Crowdfunding Listing");
    this.router.navigate(['/create-crowdfunding-listing']);
  }
}
