import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { getMaxListeners } from 'process';

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
    email: "test@test.com",
    password: "test"
  }

  constructor(public afAuth: AngularFireAuth) { }

  async createAccount() {
    const user = await this.afAuth.createUserWithEmailAndPassword(
      this.user.email,
      this.user.password
    )
  }

  ngOnInit() {
  }

}
