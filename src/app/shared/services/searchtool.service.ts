import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Searchtool } from '../models/searchtool';
import	firebase	from	'firebase/app';	
import	'firebase/auth';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SearchtoolService {
  private userRef = firebase.firestore().collection('users');

  constructor() { }

  getSearchHistory(id: string) {
    return firebase.firestore().collection('users').doc(id).get().then(doc => {
      // let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type, doc.data().status, doc.data().imageURL, doc.id, doc.data().shippingAddress, doc.data().bio );
      let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type, doc.data().status, doc.data().imageURL, doc.data().uen, doc.id, doc.data().shippingAddress, doc.data().bio);

      return firebase.firestore().collection('users/' + id + '/searchHistory/').get().then(collection => {
        user.searchList = []; // Empty array
        collection.forEach(doc => {
          let search = new Searchtool(doc.data().searchName, doc.data().searchNotified, doc.data().userNotified, doc.data().productID, doc.id);
          user.searchList.push(search);
        })
        return user;
      });
    });
  }

  updateSearchNotified(productName: string, userId: string, productID: string){
    let dbItems1 = firebase.firestore().collection('users/' + userId + '/searchHistory/')
    dbItems1.onSnapshot(itemsCollection => {
      itemsCollection.forEach(itemDoc =>{
        if (productName.toLowerCase().includes(itemDoc.data().searchName.toLowerCase()) == true){
          const ref = this.userRef.doc(userId + '/searchHistory/' + itemDoc.id)
          ref.update({
            searchNotified: true,
            productID: productID
          })
        }
      })
    })
  }

  updateUserNotified(userId: string, productID: string){
    let dbItems1 = firebase.firestore().collection('users/' + userId + '/searchHistory/')
    dbItems1.onSnapshot(itemsCollection => {
      itemsCollection.forEach(itemDoc =>{
        const ref = this.userRef.doc(userId + '/searchHistory/' + itemDoc.id)
        if(itemDoc.data().productID == productID){
          ref.update({
            userNotified: true
          })
        }
      })
    })
  }

  addSearch(id: string, s: Searchtool) {

      return firebase.firestore().collection('users/' + id + '/searchHistory/').add({
        searchName: s.name,
        searchNotified: s.notified,
        userNotified: s.userNotified,
        productID: s.productID
      })
  }

}
