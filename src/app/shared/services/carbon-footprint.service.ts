import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carbonFootprint } from '../models/carbonFootprint';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {
  private emptycarbonFootprintArray = [
    new carbonFootprint(0,'',0,0,0,0,0,0,0,0, new Date(), "pending", 0, ''),
  ];
  constructor() {   }

  carbonFootprint(): Observable<carbonFootprint[]> {
    return of(this.emptycarbonFootprintArray);
  }
}
