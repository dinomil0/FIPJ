import { Component } from '@angular/core';
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


  constructor(private authService: AuthService,
    private userService: UserService,
    private crowdfundingService: CrowdfundingService) {

    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.uid = data[u]["uid"]
        this.type = data[u]["type"]
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
      for (var index in allCF){
       if(allCF[index]){
         this.crowdfundingCount +=1
       }
      }
    });



  }
}
