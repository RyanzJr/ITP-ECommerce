import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProfileService, User } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';

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
    Username: "",
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
     private profileService: ProfileService,
     private authService: AuthService) { }

  async createAccount() {
    if (this.Validation()) {
      this.addAccount()
      this.addProfile()
      this.router.navigateByUrl("/account-list")
      this.showToast("Account created successfully!")
    }
  }

  Validation() {
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

  addProfile() {
    this.profileService.addUser(this.user).then(() => {
    }, err => {
      this.showToast('There was a problem adding a Profile :(');
    });
  }

  addAccount() {
    this.authService.SignUp(this.user.Email, this.password).then(() => {
    }, err => {
      this.showToast('There was a problem adding a Firebase Account :(');
    });
  }

  ngOnInit() {
  }


}
