import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crowdfunding } from '../shared/models/crowdfunding';
import { CrowdfundingService } from '../shared/services/crowdfunding.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-crowdfunding-pending',
  templateUrl: './crowdfunding-pending.page.html',
  styleUrls: ['./crowdfunding-pending.page.scss'],
})
export class CrowdfundingPendingPage implements OnInit {
  crowdfundingListing :Crowdfunding[];
  allCrowdfunding : Crowdfunding[];

  constructor(private crowdfundingService: CrowdfundingService,
    private userService: UserService,private router: Router) {

      this.crowdfundingService.getPendingCrowdListing()
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

  routeToApprove(id){
    this.router.navigate(['/crowdfundingdonate',id]);
  }

}
