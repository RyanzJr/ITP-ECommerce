import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

interface User {
  email?: string,
  password?: string,
}

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {

  user: User = {
    email: "test@test.com",
    password: "test",
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
