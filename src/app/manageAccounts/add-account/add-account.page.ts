import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProfileService, User } from 'src/app/services/profile.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {

  //will be stored seperately for security reasons
  password: string;

  user: User = {
    id: "",
    Username: "Ryan Dan",
    Email: "",
    Gender: "",
    Contact: "",
    Company: "",
    Image: "",
    Admin: false
  }

  constructor(public afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
     private router: Router,
     private profileService: ProfileService) { }

  async createAccount() {

    if (this.Validation()) {
      const user = await this.afAuth.createUserWithEmailAndPassword(
        this.user.Email,
        this.password
      );
      this.showToast("Account created successfully!")
      console.log("Account created successfully!")
      //create profile for new account
      this.addProfile()
      this.router.navigateByUrl("/account-list")
    }

  }

  Validation() {
    // console.log(this.email)
    // console.log(this.password)
    if (this.user.Email == null) {
      this.showToast('Email cannot be empty!');
      return false
    }
    if (!this.user.Email.includes("@")) {
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

  addProfile() {
    this.profileService.addUser(this.user).then(() => {
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    });
  }


}
