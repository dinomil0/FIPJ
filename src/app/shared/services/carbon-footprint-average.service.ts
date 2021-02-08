import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import { Observable } from 'rxjs';
import { CarbonFootprintAverage } from '../models/carbonFootprintAverage';


@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintAverageService {
  private carbonRef = firebase.firestore().collection('carbonFootprintAverage');

  constructor() { 
    
  }

  getAllCarbonAverage(): Observable<any> {
    return new Observable(observer => {
      firebase.firestore().collection('carbonFootprintAverage').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          try {
            let data = doc.data()
            let user = new CarbonFootprintAverage(data.carbonFootprint,
              doc.data().date.toDate(),
              doc.id);
              array.push(user);

          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  update(id: string, carbonFootprint: number, date: Date) {
    const ref = this.carbonRef.doc(id);

    ref.update({
      carbonFootprint: carbonFootprint,
      date: date
    })
  }

}
