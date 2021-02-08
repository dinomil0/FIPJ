import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Beans } from '../models/beans';
import { beansHistory } from '../models/beansHistory';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BeansRewardsService {
  private BeanRef = firebase.firestore().collection("beans");

  constructor() {
  }

  createBeanWallet(email: any) {
    let bean = new Beans(0)

    return firebase.firestore().collection('beans').doc(email).set({
      beans: bean.beans,
    })
  }

  createBeanHistory(email: any, beansHistory: beansHistory[]) {

    for (let history of beansHistory) {
      // Add to collection '/beans/<autoID>' 
      return firebase.firestore().collection('beans/' + email + '/beansHistory/').add({

        title: history.title,
        description: history.description,
        date: history.date,
        numberofbeans: history.numberofbeans,
        add: history.add,
        minus: history.minus,
        image: history.image
      })
    }
  }

  getBeansById(email: any) {
    return firebase.firestore().collection('beans').doc(email).get().then(doc => {
      let bean = new Beans(doc.data().beans, doc.id);
      return firebase.firestore().collection('beans/' + email + '/beansHistory/').orderBy("date" ,"desc").get().then(collection => {
        bean.beansHistory = []; // Empty array
        collection.forEach(doc => {
          let beanHistory = new beansHistory(doc.data().title, doc.data().description,
            doc.data().date.toDate(), doc.data().numberofbeans,
            doc.data().add, doc.data().minus, doc.data().image, doc.id);
          bean.beansHistory.push(beanHistory);
        })
        return bean;
      });
    });
  }

  getBeans(id: string): Observable<any> {
    return new Observable((observer) => {
      this.BeanRef.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id == id) {
            let data = doc.data();
            let b = new Beans(doc.data().beans, doc.id);
            observer.next(b);
          }
        });
      });
    });
  }

  getBeansHistoryById() {
    return new Observable(observer => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          return firebase.firestore().collection('beans/' + user.email + '/beansHistory/').get().then(collection => {
            let beans = []; // Empty array
            collection.forEach(doc => {
              let beanHistory = new beansHistory(doc.data().title, doc.data().description,
                doc.data().date.toDate(), doc.data().numberofbeans,
                doc.data().add, doc.data().minus, doc.data().image, doc.id);
              beans.push(beanHistory);
            })
            observer.next(beans);
          })
        }
      });

    })
  }
  
  update(b: Beans, email: string) {
    const ref = this.BeanRef.doc(email);

    ref.update({
      beans: b.beans,
    });
  }

}