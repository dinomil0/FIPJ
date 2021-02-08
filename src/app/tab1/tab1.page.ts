import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CrowdfundingService } from '../shared/services/crowdfunding.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isAdmin = false;
  isUser = false;
  isBusiness = false;
  uid: any;
  type: any;
  userCount = 0;
  BusinessCount = 0;
  crowdfundingCount=0;
  revenue: any;


  constructor(private authService: AuthService,
    private userService: UserService,
    private crowdfundingService: CrowdfundingService,
    private router: Router) {

    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.uid = data[u]["uid"]
        this.type = data[u]["type"]
        this.revenue = data[u]["revenue"]
      }
      if (this.type === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }

    })

    this.userService.getAllUsers().subscribe(allUsers => {
      for (var index in allUsers){
       if(allUsers[index]["type"] == "User"){
         this.userCount +=1
       }
       if(allUsers[index]["type"] == "Business"){
        this.BusinessCount +=1
       }
      }
    });

    this.crowdfundingService.getApprovedCrowdListing().subscribe(allCF => {
      let count=0;
      for (var index in allCF){
       if(allCF[index]){
         this.crowdfundingCount = count +=1
       }
      }
    });

  }

  SASViya(){
    
    var win = window.open("http://vi.accessanywhere.io/links/resources/report?uri=%2Freports%2Freports%2Fa1b14744-a588-4871-b15d-125adff28681&page=vi66", '_blank');
      win.focus();
  }

  logout(){
    this.router.navigate(['/sign-out-modal'])
  }
}
