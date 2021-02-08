import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import firebase from 'firebase/app';
import 'firebase/auth';
import { element } from 'protractor';
import { EmptyError, Observable } from 'rxjs';
import { isBoolean } from 'util';
import { Cart } from '../models/cart';
import { Product } from '../models/products';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private router: Router,) { }

  addtoCart(prodID: string, quantity: number, price: number) {
    //get entire cart of current user
    let userCart = this.userService.getUserCart().subscribe(data => {
      //get current user id
      this.userService.getCurrentUserID().subscribe(userID => {
        //retrieve current user's cart doc
        let dbCart = firebase.firestore().collection('users/' + userID + '/cart');
        //check if cart array is empty or null
        if (data.length > 0) {
          for (let cartItem in data) {
            if (data[cartItem].productID == prodID) {
              dbCart.doc(prodID).update({
                quantity: data[cartItem].quantity + quantity
              })
              break;
            }
            //if last item in array and still unable to find the product in array
            else if (Number(cartItem) == (data.length - 1) && data[cartItem].productID != prodID) {
              this.productService.getProductById(prodID).then(data => {
                dbCart.doc(prodID).set({
                  name: data.name,
                  quantity: quantity,
                  price: Number(price)
                })
              })
            }
            else {
              continue
            }
          }
        }
        else {
          this.productService.getProductById(prodID).then(data => {
            dbCart.doc(prodID).set({
              name: data.name,
              quantity: quantity,
              price: Number(price)
            })
          })
        }
      })
      //unsubscribe to prevent infinite loop
      userCart.unsubscribe()
    });
  }

  getCountOfProductInCart() {
    return new Observable(observer => {
      this.userService.getUserCart().subscribe(data => {
        let totalCount = 0;
        data.forEach(element => {
          totalCount += element.quantity
        });
        observer.next(totalCount);
      })
    })
  }

  getTotalPrice(){
    return new Observable(observer => {
      this.userService.getUserCart().subscribe(data => {
        let totalPrice = 0;
        data.forEach(element => {
          if(element.quantity > 1){
            totalPrice += element.price * element.quantity
          }
          else{
            totalPrice += element.price
          }
        });
        observer.next(totalPrice);
      })
    })
  }

  updateCartQuantity(quantity: number, prodID: string, mode: string) {
    this.userService.getCurrentUserID().subscribe(userID => {
      let dbCart = firebase.firestore().collection('users/' + userID + '/cart');
      let userCart = this.userService.getUserCart().subscribe(item => {
        console.log(item)
        item.forEach(prodObj => {
          console.log(prodObj)
          if (prodObj.productID == prodID) {
            console.log(prodObj.productID, prodID)
            if (mode == "+") {
              dbCart.doc(prodID).update({
                quantity: prodObj.quantity + quantity
              })

            }
            else if (mode == "-" && prodObj.quantity > 1) {
              dbCart.doc(prodID).update({
                quantity: prodObj.quantity - quantity
              })
            }
          }

        });
        //unsubscribe to prevent infinite loop
        userCart.unsubscribe()
      })
    })
  }

  async delete(prodID: string) {
    this.userService.getCurrentUserID().subscribe(userID => {
      let dbCart = firebase.firestore().collection('users/' + userID + '/cart');
      dbCart.doc(prodID).delete();
    })
  }
  
}


