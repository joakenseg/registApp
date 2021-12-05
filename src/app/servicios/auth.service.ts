import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { promise } from 'protractor';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any;
  TomarNombre:string;

  constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore, public plataform: Platform, private afd: AngularFireDatabase ) { }

  async resetPassword(email:string):Promise<void>{
    try{
      return this.AFauth.sendPasswordResetEmail(email);
    }
    catch(error){console.log(error)}
  }

  login(email:string, password:string){
    if(this.plataform.is('desktop')){
      return new Promise((resolve, rejected) => {
        this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
          resolve(user)
        }).catch(err => rejected(err))
      })
    }
  }

  register(email: string, password: string, nombre: string, apellido: string){
    return new Promise((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then( res =>{
          const uid = res.user.uid;
          this.db.collection('users').doc(res.user.uid).set({
            apellido: apellido,
            nombre: nombre,
            email: email,
            password: password,
            uid: uid
          })
        resolve(res)
      }).catch( err => reject(err))
    })
  }
  
  test(){
    console.log(this.db.collection('user'))
  }
}
