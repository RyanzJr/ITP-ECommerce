import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';


// interface User {
//   email?: string,
//   password?: string,
// }

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {

  email: string;
  password: string;

  constructor(public afAuth: AngularFireAuth,
    private toastCtrl: ToastController, private router: Router) { }

  async createAccount() {

    if (this.Validation()) {
      const user = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      this.router.navigateByUrl("/account-list")
      this.showToast("Account created successfully!")
      console.log("Account created successfully!")
      // console.log(this.email)
      // console.log(this.password)

    }

  }

  Validation() {
    // console.log(this.email)
    // console.log(this.password)
    if (this.email == null) {
      this.showToast('Email cannot be empty!');
      return false
    }
    if (!this.email.includes("@")) {
      this.showToast('Email is not valid!');
      return false
    }
    if (this.password == null) {
      this.showToast('Password cannot be empty!');
      return false
    }
    if (this.password.length < 6) {
      this.showToast('Password cannot be less than 6 characters!');
      return false
    }  
    return true;
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
