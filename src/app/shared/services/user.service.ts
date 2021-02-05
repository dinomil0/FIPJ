import { Injectable, ɵConsole } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import { wishList } from '../models/wishlist';
import { carbonFootprint } from "../models/carbonFootprint";
import { transactionHistory } from "../models/transactionHistory";
import { Votes } from '../models/votes';
import { EducationRecommendations } from '../models/educationRecommendations';
import { ThisReceiver } from '@angular/compiler';


// import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRef = firebase.firestore().collection('users');
  rating: number = 0;
  users: User[] = [];
  constructor() { }

  createUser(email: string, username: string, password: string, type: string, status: string, imageURL: string, uen: string) {
    let user = new User(email, username, password, type, status, imageURL, uen);
    return firebase.firestore().collection('users').add({
      email: user.email,
      username: user.username,
      password: user.password,
      type: user.type,
      status: user.status,
      imageURL: user.imageURL,
      uen: user.uen
    })
  }

  getAllUsers(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/users'
      firebase.firestore().collection('users').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add users into array if there's no error
          try {
            let data = doc.data()
            let user = new User(data.email,
              data.username,
              '',
              data.type,
              data.status,
              data.imageURL,
              data.uen,
              doc.id,
              doc.data().shippingAddress,
              doc.data().bio);
              array.push(user);

            // if (data.imageURL) {
            //   user.imageURL = data.imageURL;
            //   const imageRef = firebase.storage().ref().child(data.imageURL);
            //   imageRef.getDownloadURL()
            //     .then(url => {
            //       user.imageURL = url;
            //     }).catch(error => {
            //       console.log('Error: Read image fail ' + error);
            //     });
            // }
            
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  getAllUsersEmails(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/users'
      firebase.firestore().collection('users').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add users into array if there's no error
          try {
            array.push(doc.data().email);
          } catch (error) { }
        });
        observer.next(array);
      });
    });
  }



  delete(u: User) {
    const ref = this.userRef.doc(u.uid);
    ref.get().then(doc => {
      if (doc.exists)
        ref.delete();
    });
  }

  update(u: User) {
    const ref = this.userRef.doc(u.uid);

    ref.update({
      status: u.status,
    });
  }

  getUserById(id: string) {
    return firebase.firestore().collection('users').doc(id).get().then(doc => {
      // let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type, doc.data().status, doc.data().imageURL, doc.id, doc.data().shippingAddress, doc.data().bio );
      let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type, doc.data().status, doc.data().imageURL, doc.data().uen, doc.id, doc.data().shippingAddress, doc.data().bio);

      return firebase.firestore().collection('users/' + id + '/wishlist/').get().then(collection => {
        user.wishList = []; // Empty array
        collection.forEach(doc => {
          let wishlist = new wishList(doc.data().productID, doc.id);
          user.wishList.push(wishlist);
        })
        return user;
      });
    });
  }

  getUserByIdObs(id: string): Observable<any> {
    return new Observable((observer) => {
      this.userRef.doc(id).get().then((doc) => {
        let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type,
          doc.data().status, doc.data().imageURL, doc.data().uen,
          doc.id, doc.data().shippingAddress, doc.data().bio);

        return firebase.firestore().collection('users/' + id + '/wishlist/').get().then(collection => {
          user.wishList = []; // Empty array
          collection.forEach(doc => {
            let wishlist = new wishList(doc.data().productID, doc.id);
            user.wishList.push(wishlist);
          })

          observer.next(user);
        });
      });
    })
  }


  updateWishList(id: string, wishListID: string, productID: string[]) {
    const ref = this.userRef.doc(id + '/wishlist/' + wishListID);

    ref.update({
      productID: productID
    });
  }

  getUser(): Observable<any> {
    return new Observable(observer => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firebase.firestore().collection('users').where('email', '==', user.email).get().then(collection => {
            let array = [];
            collection.forEach(doc => {
              try {
                let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type,
                  doc.data().status, doc.data().imageURL, doc.data().uen, doc.id, doc.data().shippingAddress, doc.data().bio, doc.data().reportId);
                if (doc.data().imageURL) {
                  user.imageURL = doc.data().imageURL;
                  const imageRef = firebase.storage().ref().child(doc.id);
                  imageRef.getDownloadURL()
                    .then(url => {
                      user.imageURL = url;
                    }).catch(error => {
                      console.log('Error: Read image fail ' + error);
                    });
                }
                array.push(user);
              } catch (error) { }
            });
            observer.next(array);
          });
        }
      });


    })

  }

  getUserInstant(): Observable<any> {
    return new Observable(observer => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {     
          firebase.firestore().collection('users').where('email', '==', user.email).onSnapshot(collection => {
            let array = [];
            collection.forEach(doc => {
              try {
                let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type,
                  doc.data().status, doc.data().imageURL, doc.data().uen, doc.id, doc.data().shippingAddress, doc.data().bio);
                if (doc.data().imageURL) {
                  user.imageURL = doc.data().imageURL;
                  const imageRef = firebase.storage().ref().child(doc.id);
                  imageRef.getDownloadURL()
                    .then(url => {
                      user.imageURL = url;
                    }).catch(error => {
                      console.log('Error: Read image fail ' + error);
                    });
                }
                array.push(user);
              } catch (error) { }
            });
            observer.next(array);
          });
        }
      });
    });
  }



  updateUserProfile(u: User) {
    const ref = this.userRef.doc(u.uid);
    // Update compulsory fields. Do not update id and image
    ref.update({
      username: u.username
    });
    // Update optional fields if not undefined
    if (u.shippingAddress != undefined)
      ref.update({
        shippingAddress: u.shippingAddress
      });
    if (u.bio != undefined)
      ref.update({
        bio: u.bio
      });
  }

  createCarbonFootprint(id: string, carbonFootprint: carbonFootprint[]) {
      for (let carbon of carbonFootprint) {
        return firebase.firestore().collection('users/' + id + '/carbonFootprint/').add({

          fuelPrice: carbon.fuelPrice,
          fuelUsed: carbon.fuelUsed,
          numOfVehicles: carbon.numOfVehicles,
          fuelco2: carbon.fuelco2,
          electPrice: carbon.electPrice,
          electco2: carbon.electco2,
          gasPrice: carbon.gasPrice,
          gasco2: carbon.gasco2,
          numOfFacilities: carbon.numOfFacilities,
          carbonFootprint: carbon.carbonFootprint,
          dateFilled: carbon.dateFilled,
          status: carbon.status,
          ecoRating: carbon.ecoRating,
          email: carbon.email
        })
      }
  }

  getBusinessCarbonFootprint(id: string) {
    return firebase.firestore().collection('users').doc(id).get().then(doc => {
      // let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type, doc.data().status, doc.data().imageURL, doc.id, doc.data().shippingAddress, doc.data().bio );
      let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type, doc.data().status, doc.data().imageURL, doc.data().uen, doc.id);

      return firebase.firestore().collection('users/' + id + '/carbonFootprint/').get().then(collection => {
        user.carbonFootprint = []; // Empty array
        collection.forEach(doc => {
          let carbon = new carbonFootprint(doc.data().fuelPrice, doc.data().fuelUsed,
            doc.data().numOfVehicles, doc.data().fuelco2,
            doc.data().electPrice, doc.data().electco2,
            doc.data().gasPrice, doc.data().gasco2,
            doc.data().numOfFacilities,
            doc.data().carbonFootprint, doc.data().dateFilled.toDate(), doc.data().status, doc.data().ecoRating, doc.data().email, doc.id);
          user.carbonFootprint.push(carbon);
        })
        return user;
      });
    });
  }

  // getPendingCarbonFootprint(id: string): Observable<any> {
  //   return new Observable((observer) => {
  //     this.userRef.onSnapshot((querySnapshot) => {
  //       let users = [];
  //       querySnapshot.forEach((doc) => {
  //         let data = doc.data();
  //         let u = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type,
  //           doc.data().status, doc.data().imageURL, doc.data().uen, doc.id);
  //         users.push(u);

  //         let dbComments = firebase.firestore().collection('users/' + id + '/carbonFootprint/');
  //         dbComments.where("status", "==", "pending").onSnapshot(itemsCollection => {
  //           u.carbonFootprint = []; // Empty array
  //           itemsCollection.forEach(itemDoc => {
  //             let cFootprint = new carbonFootprint(doc.data().fuelPrice, doc.data().fuelUsed,
  //               doc.data().numOfVehicles, doc.data().fuelco2,
  //               doc.data().electPrice, doc.data().electco2,
  //               doc.data().gasPrice, doc.data().gasco2,
  //               doc.data().numOfFacilities,
  //               doc.data().carbonFootprint, doc.data().dateFilled.toDate(), doc.data().status, doc.id);
  //               u.carbonFootprint.push(cFootprint)
  //           });
  //           observer.next(u.carbonFootprint);
  //         });
  //       });
  //       // observer.next(posts);
  //     });
  //   });
  // }

  getAllCarbonFootprint(): Observable<any> {
    return new Observable(observer => {
      firebase.firestore().collection('users').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          try {
            let data = doc.data()
            if(data.type == "Business"){
              let user = new User(
                data.email,
                data.username,
                data.password,
                data.type,
                data.status,
                data.imageURL,
                data.uen,
                doc.id);
                array.push(user);

              let dbComments = firebase.firestore().collection('users/' + doc.id + '/carbonFootprint/');
              dbComments.onSnapshot(itemsCollection => {
                user.carbonFootprint = [];
                itemsCollection.forEach(itemDoc => {
                  let carbon = new carbonFootprint(itemDoc.data().fuelPrice, itemDoc.data().fuelUsed, itemDoc.data().numOfVehicles,
                  itemDoc.data().fuelco2, itemDoc.data().electPrice, itemDoc.data().electco2, itemDoc.data().gasPrice,
                  itemDoc.data().gasco2, itemDoc.data().numbOfFacilities, itemDoc.data().carbonFootprint, itemDoc.data().dateFilled,
                  itemDoc.data().status, itemDoc.data().ecoRating, itemDoc.data().email, itemDoc.id);
                  user.carbonFootprint.push(carbon);
                });
                observer.next(user.carbonFootprint)
              })
            }

          } catch (error) { }
        });
        // observer.next(array);
      });
    });
  }



  getPendingCarbonFootprint(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/users'
      firebase.firestore().collection('users').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add users into array if there's no error
          try {
            let data = doc.data()
            let user = new User(data.email,
              data.username,
              '',
              data.type,
              data.status,
              data.imageURL,
              data.uen,
              doc.id,
              doc.data().shippingAddress,
              doc.data().bio);
              array.push(user);
              let dbComments = firebase.firestore().collection('users/' + doc.id + '/carbonFootprint/');
              dbComments.where("status", "==", "pending").onSnapshot(itemsCollection => {
                user.carbonFootprint = []; // Empty array
                itemsCollection.forEach(itemDoc => {
                  let cFootprint = new carbonFootprint(itemDoc.data().fuelPrice, itemDoc.data().fuelUsed,
                  itemDoc.data().numOfVehicles, itemDoc.data().fuelco2,
                  itemDoc.data().electPrice, itemDoc.data().electco2,
                  itemDoc.data().gasPrice, itemDoc.data().gasco2,
                  itemDoc.data().numOfFacilities,
                  itemDoc.data().carbonFootprint, itemDoc.data().dateFilled.toDate(), itemDoc.data().status, itemDoc.data().email ,itemDoc.id);
                  
                  // if(cFootprint != [])
                  user.carbonFootprint.push(cFootprint)
                });
                observer.next(user.carbonFootprint)
              })

          } catch (error) { }

        });
      });
    })

  }

  createTransactionHistory(id: string, transactionHistory: transactionHistory[]) {

    for (let transaction of transactionHistory) {
      return firebase.firestore().collection('users/' + id + '/transactionHistory/').add({

        name: transaction.name,
        description: transaction.description,
        quantity: transaction.quantity,
        date: transaction.date,
        price: transaction.price,
      })
    }
  }

  createVote(id: string, votes: Votes[]) {

    for (let vote of votes) {
      return firebase.firestore().collection('users/' + id + '/votes/').add({
        postId: vote.postId,
        upvote: vote.upvote,
        downvote: vote.downvote,
      })
    }
  }

  getVotes(id: string) {
    return firebase.firestore().collection('users').doc(id).get().then(doc => {
      let user = new User(doc.data().email, doc.data().username, doc.data().password, doc.data().type, doc.data().status, doc.data().imageURL, doc.data().uen, doc.id);

      return firebase.firestore().collection('users/' + id + '/votes/').get().then(collection => {
        user.votes = []; // Empty array
        collection.forEach(doc => {
          let vote = new Votes(doc.data().postId, doc.data().upvote,
            doc.data().downvote, doc.id);
          user.votes.push(vote);
        })
        return user.votes;
      });
    });
  }

  updateVotes(id: string, votesId: string, Votes: Votes[]) {
    const ref = this.userRef.doc(id + '/votes/' + votesId);
    for (let vote of Votes) {
      ref.update({
        upvote: vote.upvote,
        downvote: vote.downvote,
        postId: vote.postId
      });
    }
  }

  createEducationRecommendations(id: string, tags: []) {
      return firebase.firestore().collection('users/' + id + '/educationRecommendation/').add({
        tags: tags
      })
    
  }

  updateEducationRecommendations(id: string, eduRecId: string, tags: []) {
    const ref = this.userRef.doc(id + '/educationRecommendation/' + eduRecId);
   
    ref.update({
      tags: tags
    });
  
  }

  getEducationRecommendations(id: string): Observable<any> {
    return new Observable((observer) => {
      let dbComments = firebase.firestore().collection('users/' + id + '/educationRecommendation/');
      dbComments.onSnapshot(itemsCollection => {
        let recArray = []; // Empty array
        itemsCollection.forEach(itemDoc => {
          let rec = new EducationRecommendations(itemDoc.data().tags, itemDoc.id);
          recArray.push(rec);
          // commentsArray.count = p.comments.length
        });
        observer.next(recArray);
      });
    });
    // observer.next(posts);
  }

  updateUserPicture(id: string, image: any){
    // const ref = this.userRef.doc(id);
   
    if (image) {
      const dataUrl = image.changingThisBreaksApplicationSecurity;
      console.log(dataUrl)
      const imageRef = firebase.storage().ref().child(id);
      console.log(imageRef)
      imageRef.putString(dataUrl, firebase.storage.StringFormat.DATA_URL).then(() => {
        const ref = this.userRef.doc(id);
        ref.update({ imageURL: id });
      });
    }
  }
   
  
  getAllEcoRating(): number {
    return this.rating;
  } 

  setEcoRating(rating: number){
    this.rating = rating;
  }

}
