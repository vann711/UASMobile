// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
    private navController: NavController
  ) { }

  registerUser(value) {
    return new Promise<any>(
      (resolve, reject) => {
        this.fireAuth.createUserWithEmailAndPassword(
          value.email, value.password
        ).then(
          (userCred) => {
            console.log(value.name)
            this.fireDb.database.ref('users/' + userCred.user.uid).set({
              name: value.name,
              email: value.email,
            });
          }
        ).then(
          res => {
            resolve(res)
          },
          err => reject(err)
        );
      }
    );
  }

  loginUser(value){
    return new Promise<any>(
      (resolve, reject) => {
        this.fireAuth.signInWithEmailAndPassword(
          value.email, value.password
        ).then(
          res => resolve(res), err => reject(err)
        );
      }
    );
  }

  logoutUser() {
    return new Promise(
      (resolve, reject) => {
        if(this.fireAuth.currentUser) {
          this.fireAuth.signOut().then(
            () => {
              this.navController.navigateRoot("")
              resolve();
            } 
          ).catch(
            (error) => {
              reject();
            }
          );
        }
      }
    );
  }

}
