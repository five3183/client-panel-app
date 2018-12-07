import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afAuth: AngularFireAuth) { }

  login(email:string, password:string) {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err))
    })
  }

  getAuth() {
    return this._afAuth.authState.pipe(map(auth => auth))
  }
  logout() {
    this._afAuth.auth.signOut()
  }
}
