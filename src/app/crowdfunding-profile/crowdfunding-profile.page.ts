import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crowdfunding } from '../shared/models/crowdfunding';
import { CrowdfundingService } from '../shared/services/crowdfunding.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-crowdfunding-profile',
  templateUrl: './crowdfunding-profile.page.html',
  styleUrls: ['./crowdfunding-profile.page.scss'],
})
export class CrowdfundingProfilePage implements OnInit {
  crowdfundingListing :Crowdfunding[];
  allCrowdfunding : Crowdfunding[];
  crowdfundingListingAdmin :Crowdfunding[];
  allCrowdfundingAdmin : Crowdfunding[];
  userEmail: string;
  userType: string;
  isUser: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  // GA (GoalAmt), RA (ReceiveAmt), GAA(GoalAmtAdmin), RAA(ReceieAmtAdmin), is used to store the amount from the for loop and to display the info onto html
  GA = 0;
  RA = 0;
  GAA = 0;
  RAA = 0;
  crowdFund: Crowdfunding

  constructor(private crowdfundingService: CrowdfundingService,
    private userService: UserService,private router: Router) {
      this.userService.getUser().subscribe(data => {
        for (var u in data) {
          this.userEmail = data[u]["email"],
          this.userType = data[u]["type"]
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


      this.userService.getUser()
      .subscribe(data => {
        for (let user of data) {
          this.crowdfundingService.getSelectedUserCrowdListing(user.email)
            .subscribe(data => {
              let totalGoal = 0;
              let totalReceive = 0;
              this.crowdfundingListing = this.allCrowdfunding = data;
              for(let i of this.allCrowdfunding){
               this.RA= totalReceive += i.receiveAmt;
               this.GA= totalGoal += i.goalAmt;
              }
            });
        }
      })

     
          this.crowdfundingService.getApprovedCrowdListing()
            .subscribe(data => {
              this.crowdfundingListingAdmin = this.allCrowdfundingAdmin = data;
              let totalGoalAmtAdmin = 0;
              let totalReceiveAdmin = 0;
              for(let i of this.allCrowdfundingAdmin){
                this.RAA = totalReceiveAdmin += i.receiveAmt;
                this.GAA = totalGoalAmtAdmin += i.goalAmt;
              }
            });
        
  




    //   console.log(this.userEmail)
    //   this.crowdfundingService.getSelectedUserCrowdListing("work@eliasgreen.com")
    //   .subscribe(data => {
    //   this.crowdfundingListing = this.allCrowdfunding = data;
    //     console.log(this.crowdfundingListing)
    //  });
    

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

  searchAdmin(event) {
    const text = event.target.value;
    console.log(text)
    if (text && text.trim() !== '') {
      this.allCrowdfundingAdmin = this.crowdfundingListingAdmin.filter(
        item => item.nameProduct.toLowerCase().includes(text.toLowerCase()));
    } 
    else {
      this.allCrowdfundingAdmin = this.crowdfundingListingAdmin;
    }
  }

  deleteListing(c:Crowdfunding){
    this.crowdfundingService.delete(c);
  }

  routeToView(id){
    this.router.navigate(['/crowdfundingdonate',id]);
  }
}
