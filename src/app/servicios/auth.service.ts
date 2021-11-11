import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth) { }

  login(email:string, password:string){
    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, password).then(res => {
        console.log('INICIO DE SESION CORRECTO: ' + res)
      }).catch(err => console.log('ERROR AL INICIAR SESION : ' + err))
    })
  }
}
