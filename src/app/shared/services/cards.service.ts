import { Injectable } from '@angular/core';
import	firebase	from	'firebase/app';	
import	'firebase/auth';
import { Observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { Cards } from '../models/cards';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private usersRef = firebase.firestore().collection('users/')
  cards: Cards

  constructor(private authService: AuthService) {}

  getCardByUser(): Observable<any> {
    return new Observable(observer => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase.firestore().collection("users").where("email", "==", user.email)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                 // Read subcollection '/users/<autoID>/cards'
                firebase.firestore().collection('users/' + doc.id + '/cards').onSnapshot((querySnapshot) => {
                  let cardArray = [];
                  querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    let card = new Cards(data.cardNumber, data.cardName, data.cardExpiration, data.cardCVV, user.email, data.selected, doc.id);
                    cardArray.push(card)
                  })
                  observer.next(cardArray);
                })
              })
            })
          }
        })
    })
  }
  
  addCard(c: Cards): Observable<any> {
    return new Observable(observer => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase.firestore().collection("users").where("email", "==", user.email)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                 // Read subcollection '/users/<autoID>/cards'
                let dbItems1 = firebase.firestore().collection('users/' + doc.id + '/cards');
                dbItems1.onSnapshot(itemsCollection => {
                  itemsCollection.forEach(itemDoc => {
                    let dbItems2 = firebase.firestore().collection('users/' + doc.id + '/cards' + itemDoc.id);
                    dbItems2.onSnapshot(itemsCollection => {
                      itemsCollection.forEach(itemDoc2 =>{
                        let card = new Cards(c.cardNum, c.cardName, c.cardExpiration, c.CVV, user.email, false);
                        dbItems2.add({
                          cardNumber: c.cardNum,
                          cardName: c.cardName,
                          cardExpiration: c.cardExpiration,
                          cardCVV: c.CVV,
                          owner: user.email,
                          selected: false
                        })
                      })
                    });
                  })
                })
              })
            })
          }
        })
    })
  }

  updateCard(cardId: string, userId: string, selected: boolean){
    let dbItems1 = firebase.firestore().collection('users/' + userId + '/cards/')
    dbItems1.onSnapshot(itemsCollection => {
      itemsCollection.forEach(itemDoc =>{
        if (itemDoc.data().selected == true){
          const ref2 = this.usersRef.doc(userId + '/cards/' + itemDoc.id)
          ref2.update({
            selected: false
          })
        }
      })
    })

    const ref = this.usersRef.doc(userId + '/cards/' + cardId);
    ref.update({
      selected: selected
    });
  }

  resetSelected(userId: string){
      const ref = this.usersRef.doc(userId + '/cards/')

      ref.update({
        selected: false
    })
  }
}

