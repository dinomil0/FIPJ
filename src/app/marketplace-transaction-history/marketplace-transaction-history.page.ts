import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-marketplace-transaction-history',
  templateUrl: './marketplace-transaction-history.page.html',
  styleUrls: ['./marketplace-transaction-history.page.scss'],
})
export class MarketplaceTransactionHistoryPage implements OnInit {
  uid: any;
  type: any;
  transactions: any[] = [];

  constructor(private userService: UserService) {
    this.userService.getUser()
      .subscribe(data => {
        for (var u in data) {
          this.uid = data[u]["uid"]
          this.type = data[u]["type"]

          this.userService.getTransactionHistory(this.uid).then(transactions => {
            for(var temp of transactions){
              console.log(temp)
              // Change type
              if(temp.description == "Marketplace Purchase" || temp.description =="Marketplace Sold"){
                if(temp.quantity >1){
                  temp.price = temp.price * temp.quantity
                }
                this.transactions.push(temp)
              }
            }
            console.log(this.transactions)
          })
        }


      })
  }

  ngOnInit() {
  }

}
