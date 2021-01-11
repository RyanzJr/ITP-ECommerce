import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
  ) { 
  }

  async SignUp(email, password) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['/account-list']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  async SignIn(email, password) {
    return await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
         this.router.navigate(['/homeadmin']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  async SignOut() {
    return await this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    })
  }

}
