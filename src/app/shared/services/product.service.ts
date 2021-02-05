import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from './user.service';
import { carbonFootprint } from '../models/carbonFootprint';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  private productsRef = firebase.firestore().collection("products");
  ecoRating: number;
  seller: string[] = [];
  carbonFootprintArray: carbonFootprint[];
  carbonFootprint: carbonFootprint;

  constructor(private storage: AngularFireStorage,
    private userService: UserService,) { }

  getProducts(): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.onSnapshot((querySnapshot) => {
        let products = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let p = new Product(data.name, data.price, data.numberSold, data.image, data.rating, data.description, data.flag, data.boost, data.expiryDate, data.seller, doc.id);
          if (data.image) {
            const imageRef = firebase.storage().ref().child(doc.id)
            imageRef.getDownloadURL()
              .then(url => {
                p.image = url;
              }).catch(error => {
                console.log(error)
              })
          }
          products.push(p);
        });
        observer.next(products);
      });
    });
  }

  getPendingProducts(): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.where("flag", "==", "pending").onSnapshot((querySnapshot) => {
        let products = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let p = new Product(data.name, data.price, data.numberSold, data.image, data.rating, data.description, data.flag, data.boost, data.expiryDate, data.seller, doc.id);
          if (data.image) {
            const imageRef = firebase.storage().ref().child(doc.id)
            imageRef.getDownloadURL()
              .then(url => {
                p.image = url;
              }).catch(error => {
                console.log(error)
              })
          }
          products.push(p);
        });
        observer.next(products);
      });
    });
  }

  getFlaggedProducts(): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.where("flag", "==", "true").onSnapshot((querySnapshot) => {
        let products = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let p = new Product(data.name, data.price, data.numberSold, data.image, data.rating, data.description, data.flag, data.boost, data.expiryDate, data.seller, doc.id);
          if (data.image) {
            const imageRef = firebase.storage().ref().child(doc.id)
            imageRef.getDownloadURL()
              .then(url => {
                p.image = url;
              }).catch(error => {
                console.log(error)
              })
          }
          products.push(p);
        });
        observer.next(products);
      });
    });
  }




  getAllProducts(seller: string[]): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.onSnapshot((querySnapshot) => {
        let products = [];
        querySnapshot.forEach((doc) => {
          for (let sellers of seller) {
            let data = doc.data();
            if (sellers == data.seller) {
              let p = new Product(data.name, data.price, data.numberSold, data.image, data.rating, data.description, data.flag, data.boost, data.expiryDate, data.seller, doc.id);
              if (data.image) {
                const imageRef = firebase.storage().ref().child(doc.id)
                imageRef.getDownloadURL()
                  .then(url => {
                    p.image = url;
                  }).catch(error => {
                    console.log(error)
                  })
              }
              if (products.includes(p) == false) {
                products.push(p);
              }
            }
          }
        });
        observer.next(products);
      });
    });
  }

  getProductByID(id: string): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.doc(id).get().then((doc) => {
        let data = doc.data();
        let p = new Product(data.name, data.price, data.numberSold, data.image, data.rating, data.description, data.flag, data.boost, data.expiryDate, data.seller, doc.id);
        if (data.image) {
          const imageRef = firebase.storage().ref().child(doc.id)
          imageRef.getDownloadURL()
            .then(url => {
              p.image = url;
            }).catch(error => {
              console.log(error)
            });
        }
        observer.next(p);
      });
    });
  }

  flagProduct(prodID: string) {
    this.productsRef.doc(prodID).update({ 'flag': 'pending' });
  }

  // getProductById(id: string) {
  //   // Read document '/loans/<id>'
  //   return firebase.firestore().collection('products').doc(id).get().then(doc => {
  //     let data = doc.data();
  //     let product = new Product(doc.id, data.name, data.price, data.description, data.numberSold, data.image, data.rating, data.flag, data.boost, data.expiryDate, data.seller);
  //     return product;
  //   });

  // }

  // getProductsBySeller(): Observable<any> {
  //   return new Observable((observer) => {
  //     firebase.auth().onAuthStateChanged(function(user) {
  //       if (user) {
  //         firebase.firestore().collection("products").where("seller", "==", user.email)
  //         .get()
  //         .then(function(querySnapshot) {
  //             let products = []
  //             querySnapshot.forEach(function(doc) {
  //               let data = doc.data();
  //               let p = new Product(data.name, data.price, data.numberSold, data.image, data.rating, data.description, data.flag, data.boost, data.expiryDate, data.seller, doc.id)
  //               if(data.image){
  //                 const imageRef = firebase.storage().ref().child(doc.id)
  //                 imageRef.getDownloadURL()
  //                 .then(url => {
  //                   p.image = url;
  //                 }).catch(error => {
  //                   console.log(error)
  //                 })
  //               }
  //               products.push(p)
  //             });
  //             observer.next(products);
  //         })
  //         };
  //     });
  //   })
  // }

  getProductsBySeller(email: string): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.onSnapshot((querySnapshot) => {
        let products = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          if (data.seller == email) {
            let data = doc.data();
            let p = new Product(data.name, data.price, data.numberSold, data.image, data.rating, data.description, data.flag, data.boost, data.expiryDate, data.seller, doc.id)
            if (data.image) {
              const imageRef = firebase.storage().ref().child(doc.id)
              imageRef.getDownloadURL()
                .then(url => {
                  p.image = url;
                }).catch(error => {
                  console.log(error)
                })
            }
            products.push(p)
          }
        });
        observer.next(products);
      });
    });
  }

  updateFlag(id: string, flag: string) {
    const ref = this.productsRef.doc(id);

    ref.update({
      flag: flag
    });
  }

  async delete(p: Product) {
    const ref = this.productsRef.doc(p.id);
    ref.delete()
  }

  add(p: Product) {
    // Let firebase auto generate id
    this.productsRef.add({
      name: p.name,
      price: p.price,
      numberSold: p.numberSold,
      description: p.description,
      // image: p.image,
      rating: p.rating,
      flag: p.flag,
      boost: p.boost,
      expiryDate: p.expiryDate,
      seller: p.seller
    })
      .then(doc => {
        if (p.image) {
          const dataUrl = p.image.changingThisBreaksApplicationSecurity;
          const imageRef = firebase.storage().ref().child(doc.id);
          imageRef.putString(dataUrl, firebase.storage.StringFormat.DATA_URL).then(() => {
            const ref = this.productsRef.doc(doc.id);
            ref.update({ image: doc.id });
          });
        }
      });
  }

  update(p: Product) {
    const ref = this.productsRef.doc(p.id);
    // Update compulsory fields. Do not update id and image
    ref.update({
      name: p.name,
      price: p.price,
      description: p.description,
      boost: p.boost
    })
  };

}



