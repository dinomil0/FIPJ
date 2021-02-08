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
    'Purchase of GreenIT Beans',0,new Date(),0, ''),
  ];

  private usercheckout = [
    new transactionHistory('',
    'Crowd-Funding Purchase',0,new Date(),0, ''),
  ];

  private businesscheckout = [
    new transactionHistory('',
    'Raise from Crowd-Funding',0,new Date(),0, ''),
  ];

  private userMPcheckout = [
    new transactionHistory('',
    'Marketplace Purchase',0,new Date(),0, ''),
  ];

  private businessMPcheckout = [
    new transactionHistory('',
    'Marketplace Sold',0,new Date(),0, ''),
  ];
  
  constructor() { }

  buyingGreenITbeans(): Observable<transactionHistory[]> {
    return of(this.buyingBeans);
  }

  usercheckoutSuccess(): Observable<transactionHistory[]> {
    return of(this.usercheckout);
  }

  businesscheckoutSuccess(): Observable<transactionHistory[]> {
    return of(this.businesscheckout);
  }

  userMPcheckoutSuccess(): Observable<transactionHistory[]> {
    return of(this.userMPcheckout);
  }

  businessMPcheckoutSuccess(): Observable<transactionHistory[]> {
    return of(this.businessMPcheckout);
  }
}
