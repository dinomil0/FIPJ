import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-crowdfunding-history',
  templateUrl: './crowdfunding-history.page.html',
  styleUrls: ['./crowdfunding-history.page.scss'],
})
export class CrowdfundingHistoryPage implements OnInit {
  uid: any;
  type: any;
  transactions: any[] = [];

  constructor(private userService: UserService) {
    this.userService.getUser()
      .subscribe(data => {
        for (var u in data) {
          this.uid = data[u]["uid"]
          this.type = data[u]["type"]

          this.userService.getCrowdFTransactions(this.uid).subscribe(transactions => {
            // store the all the transactions in an empty array before the for loop
            let transactArray = [];
            for(var temp of transactions){
              // Change type
              if(temp.description == "Crowd-Funding Purchase" || temp.description == "Raise from Crowd-Funding"){
                transactArray.push(temp)
              }
            }
            console.log(this.transactions)
            // store in the global variable to call it onto HTML
            this.transactions = transactArray
          })
        }
      })


   }

  ngOnInit() {
  }

}
