import { Injectable } from '@angular/core';
import { transactionHistory } from '../models/transactionHistory';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {
  private buyingBeans = [
    new transactionHistory('GreenIT Beans',
    'Purchase of GreenIT Beans',0,new Date(),0),
  ];

  private checkout = [
    new transactionHistory('',
    '',0,new Date(),0),
  ];
  
  constructor() { }

  buyingGreenITbeans(): Observable<transactionHistory[]> {
    return of(this.buyingBeans);
  }

  checkoutSuccess(): Observable<transactionHistory[]> {
    return of(this.checkout);
  }
}
