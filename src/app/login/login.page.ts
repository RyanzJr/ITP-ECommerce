import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { getMaxListeners } from 'process';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


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
     private router: Router,) { }

  async login() {
    const user = await this.afAuth.signInWithEmailAndPassword(
      this.user.email,
      this.user.password
    );
    this.showToast("Login Successful!")
    user.user.email
      this.router.navigateByUrl("/")
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
