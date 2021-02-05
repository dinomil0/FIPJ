import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.page.html',
  styleUrls: ['./total-users.page.scss'],
})
export class TotalUsersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayAllHistory() {
    // this.history = this.allHistory
    document.getElementById("displayAllHistoryTab").style.borderBottomColor = 'black'
    document.getElementById("displayEarningsTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("displaySpendingsTab").style.borderBottomColor = '#DCDCDC'

  }

  displayEarnings() {
    // this.history = this.earningsHistory
    document.getElementById("displayEarningsTab").style.borderBottomColor = 'black'
    document.getElementById("displayAllHistoryTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("displaySpendingsTab").style.borderBottomColor = '#DCDCDC'

  }

  displaySpendings() {
    // this.history = this.spendingsHistory
    document.getElementById("displaySpendingsTab").style.borderBottomColor = 'black'
    document.getElementById("displayAllHistoryTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("displayEarningsTab").style.borderBottomColor = '#DCDCDC'

  }

}
