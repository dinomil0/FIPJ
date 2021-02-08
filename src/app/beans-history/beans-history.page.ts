import { Component, OnInit } from '@angular/core';
import { beansHistory } from '../shared/models/beansHistory';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';
import { BeansRewardsService } from '../shared/services/beans-rewards.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-beans-history',
  templateUrl: './beans-history.page.html',
  styleUrls: ['./beans-history.page.scss'],
})

export class BeansHistoryPage implements OnInit {
  NoOfBeans: number;
  email: string;
  allHistory: beansHistory[];
  earningsHistory: beansHistory[] = [];
  spendingsHistory: beansHistory[] = [];
  history: beansHistory[];
  beans: number;
  type: any;

  constructor(private authService: AuthService,
    private beansRewardsService: BeansRewardsService,
    private analyticsService: AnalyticsService,
    private userService: UserService) {
    this.authService.observeAuthState(user => {
      this.email = user.email

      // Get Beans
      this.beansRewardsService.getBeansById(this.email).then(beansObject => {
        this.NoOfBeans = beansObject.beans;
        this.history = this.allHistory = beansObject["beansHistory"]
        console.log(this.allHistory)

        // Filtering into Earnings and Spendings
        for (var hist in this.allHistory) {
          if (this.allHistory[hist]["add"] == true) {
            this.earningsHistory.push(this.allHistory[hist])
          } else {
            // continue
          }
          if (this.allHistory[hist]["minus"] == true) {
            this.spendingsHistory.push(this.allHistory[hist])
            console.log(this.spendingsHistory)
          } else {
            // continue
          }
          
        }
      })
    })
    this.userService.getUser()
    .subscribe(data =>{
      for (var u in data) {
        this.type = data[u]["type"]
      }
    })
  }

  ngOnInit() {
  }

  displayAllHistory() {
    // Replacing array 
    this.history = this.allHistory

    // Changing Border Bottom Color
    document.getElementById("displayAllHistoryTab").style.borderBottomColor = '#28ba62'
    document.getElementById("displayEarningsTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("displaySpendingsTab").style.borderBottomColor = '#DCDCDC'

    // Changing Icon color
    document.getElementById("allHistoryIcon").style.color = '#28ba62'
    document.getElementById("allHistoryLabel").style.color = '#28ba62'
    document.getElementById("EarningsIcon").style.color = 'black'
    document.getElementById("EarningsLabel").style.color = 'black'
    document.getElementById("SpendingsIcon").style.color = 'black'
    document.getElementById("SpendingsLabel").style.color = 'black'

    //Google Analytics Log
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " sort to display all history");
  }

  displayEarnings() {
    // Replacing array 
    this.history = this.earningsHistory

    // Changing Border Bottom Color
    document.getElementById("displayEarningsTab").style.borderBottomColor = '#28ba62'
    document.getElementById("displayAllHistoryTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("displaySpendingsTab").style.borderBottomColor = '#DCDCDC'

    // Changing Icon color
    document.getElementById("allHistoryIcon").style.color = 'black'
    document.getElementById("allHistoryLabel").style.color = 'black'
    document.getElementById("EarningsIcon").style.color = '#28ba62'
    document.getElementById("EarningsLabel").style.color = '#28ba62'
    document.getElementById("SpendingsIcon").style.color = 'black'
    document.getElementById("SpendingsLabel").style.color = 'black'

    //Google Analytics Log
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " sort to display earnings");

  }

  displaySpendings() {
    // Replacing array 
    this.history = this.spendingsHistory

    // Changing Border Bottom Color
    document.getElementById("displaySpendingsTab").style.borderBottomColor = '#28ba62'
    document.getElementById("displayAllHistoryTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("displayEarningsTab").style.borderBottomColor = '#DCDCDC'

    // Changing Icon color
    document.getElementById("allHistoryIcon").style.color = 'black'
    document.getElementById("allHistoryLabel").style.color = 'black'
    document.getElementById("EarningsIcon").style.color = 'black'
    document.getElementById("EarningsLabel").style.color = 'black'
    document.getElementById("SpendingsIcon").style.color = '#28ba62'
    document.getElementById("SpendingsLabel").style.color = '#28ba62'

    //Google Analytics Log
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type+ " sort to display spendings");
  }

}
