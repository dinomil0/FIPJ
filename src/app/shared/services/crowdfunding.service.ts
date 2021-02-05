import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { Crowdfunding } from '../models/crowdfunding';

@Injectable({
  providedIn: 'root'
})
export class CrowdfundingService {
  private crowdfundRef = firebase.firestore().collection('crowdfunding')

  constructor() { }

  getAllCrowdListing(): Observable<any> {
    return new Observable((observer) => {
      this.crowdfundRef.onSnapshot((querySnapshot) => {
        let crowdfundingListing = [];
        querySnapshot.forEach((doc) => {
        let data = doc.data();
        let p = new Crowdfunding(data.username, data.nameProduct, data.goalAmt, data.receiveAmt,
          data.description, data.ecoRating, data.userEmail, data.image, data.imagePath,data.status,doc.id);
          if (data.image) {
            p.imagePath = data.image;
            const imageRef = firebase.storage().ref().child(data.image);
            imageRef.getDownloadURL()
            .then(url => {
            p.image = url;
            }).catch(error => {
            console.log('Error: Read image fail ' + error);
            });
            }
           
        crowdfundingListing.push(p);
        });
        observer.next(crowdfundingListing);
        });
        });
        }

        getApprovedCrowdListing(): Observable<any> {
          return new Observable((observer) => {
            this.crowdfundRef.where("status","==","approved").onSnapshot((querySnapshot) => {
              let crowdfundingListing = [];
              querySnapshot.forEach((doc) => {
              let data = doc.data();
              let p = new Crowdfunding(data.username, data.nameProduct, data.goalAmt, data.receiveAmt,
                data.description, data.ecoRating, data.userEmail, data.image, data.imagePath,data.status,doc.id);
                if (data.image) {
                  p.imagePath = data.image;
                  const imageRef = firebase.storage().ref().child(data.image);
                  imageRef.getDownloadURL()
                  .then(url => {
                  p.image = url;
                  }).catch(error => {
                  console.log('Error: Read image fail ' + error);
                  });
                  }
                 
              crowdfundingListing.push(p);
              });
              observer.next(crowdfundingListing);
              });
              });
              }

              getPendingCrowdListing(): Observable<any> {
                return new Observable((observer) => {
                  this.crowdfundRef.where("status","==","pending").onSnapshot((querySnapshot) => {
                    let crowdfundingListing = [];
                    querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    let p = new Crowdfunding(data.username, data.nameProduct, data.goalAmt, data.receiveAmt,
                      data.description, data.ecoRating, data.userEmail, data.image, data.imagePath,data.status,doc.id);
                      if (data.image) {
                        p.imagePath = data.image;
                        const imageRef = firebase.storage().ref().child(data.image);
                        imageRef.getDownloadURL()
                        .then(url => {
                        p.image = url;
                        }).catch(error => {
                        console.log('Error: Read image fail ' + error);
                        });
                        }
                       
                    crowdfundingListing.push(p);
                    });
                    observer.next(crowdfundingListing);
                    });
                    });
                    }


            getCrowdfundingById(id: string): Observable<any> {
              return new Observable((observer) => {
                this.crowdfundRef.onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    if (doc.id == id) {
                      let p = new Crowdfunding(data.username, data.nameProduct, data.goalAmt, data.receiveAmt,
                        data.description, data.ecoRating, data.userEmail, data.image, data.imagePath,data.status,doc.id);
                        if (data.image) {
                          p.imagePath = data.image;
                          const imageRef = firebase.storage().ref().child(data.image);
                          imageRef.getDownloadURL()
                          .then(url => {
                          p.image = url;
                          }).catch(error => {
                          console.log('Error: Read image fail ' + error);
                          });
                          }
                      observer.next(p);
                    }
          
                  })
                });
              });
            }

            createCF(c: Crowdfunding) {
              // Let firebase auto generate id
              this.crowdfundRef.add({
                username: c.username,
                nameProduct: c.nameProduct,
                goalAmt: c.goalAmt,
                receiveAmt: c.receiveAmt,
                description: c.description,
                ecoRating: c.ecoRating,
                userEmail: c.userEmail,
                status: c.status,
              })
              .then(doc => {
                if (c.image) {
                  const dataUrl = c.image.changingThisBreaksApplicationSecurity;
                  const imageRef = firebase.storage().ref().child(doc.id);
                  imageRef.putString(dataUrl, firebase.storage.StringFormat.DATA_URL).then(() => {
                    const ref = this.crowdfundRef.doc(doc.id);
                    ref.update({image: doc.id});
                  });
                }
              });
            }


            donateUpdate(c:Crowdfunding,userDonate: number) {
              const ref = this.crowdfundRef.doc(c.id);
              let newamount = c.receiveAmt + userDonate;
              console.log(newamount)
              // Update compulsory fields. Do not update id and image
              ref.update({
                username: c.username,
                nameProduct: c.nameProduct,
                goalAmt: c.goalAmt,
                receiveAmt: newamount,
                description: c.description,
                ecoRating: c.ecoRating,
                userEmail: c.userEmail,
                image: c.image,
                imagePath: c.imagePath,
                status: c.status
              });
              }
       
}
