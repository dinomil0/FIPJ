import { Injectable } from '@angular/core';
import	firebase	from	'firebase/app';	
import	'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  observeAuthState(func) {
    return firebase.auth().onAuthStateChanged(func);
  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(
      email, password);
  }
  
  sendVerficationEmail(){
    return firebase.auth().currentUser.sendEmailVerification()
  }

  sendPasswordResetEmail(email: string){
    return firebase.auth().sendPasswordResetEmail(email)
  }
  
  // check_email(email: string) {
  //   return this.afStore.collection('/users', ref => ref.where('email', '==', email))   
  // }

}
