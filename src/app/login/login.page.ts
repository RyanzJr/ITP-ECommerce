import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { getMaxListeners } from 'process';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


interface User {
  email?: string,
  password?: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = {
    email: "",
    password: ""
  }

  constructor(public afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService) { }

  async login() {
    const user = await this.afAuth.signInWithEmailAndPassword(
      this.user.email,
      this.user.password
    );
    this.showToast("Login Successful!")
    //check currentuser email
    this.router.navigateByUrl("/homeadmin")
    console.log("email:" + (await this.afAuth.currentUser).email)
  }

  Validation() {
    if (this.user.email == null) {
      this.showToast('Email cannot be empty!');
      return false
    }
    if (!this.user.email.includes("@")) {
      this.showToast('Email is not valid!');
      return false
    }
    if (this.user.password == null) {
      this.showToast('Password cannot be empty!');
      return false
    }

    return true;
  }

  CheckUserRole(){
    
  }

  SignIn() {
    this.authService.SignIn(this.user.email, this.user.password).then(() => {
    }, err => {
      this.showToast('There a problem signing in :(');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


  ngOnInit() {
  }

}
