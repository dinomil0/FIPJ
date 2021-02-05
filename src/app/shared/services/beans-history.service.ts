import { Injectable } from '@angular/core';
import { beansHistory } from '../models/beansHistory';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class BeansHistoryService {
  private addOneCoin = [
    new beansHistory('Daily Check-in', 
    'Coins Reward from daily check-in', 
    new Date(),
     1,
     true,
     false,
     'assets/icon/beans.png'),
  ];

  private buyCoins = [
    new beansHistory('Purchase of GreenIT Beans', 
    'Completed Purchase', 
    new Date(),
     0,
     true,
     false,
     'assets/icon/beans.png'),
  ];

  private usedCoins = [
    new beansHistory('Use GreenIT Beans', 
    'Completed Transaction', 
    new Date(),
     0,
     false,
     true,
     'assets/icon/beans.png'),
  ];
  constructor() {
   }

   dailyCoin(): Observable<beansHistory[]> {
    return of(this.addOneCoin);
  }

  buyCoin(): Observable<beansHistory[]> {
    return of(this.buyCoins);
  }

  usedCoin(): Observable<beansHistory[]> {
    return of(this.usedCoins);
  }
}
