import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { getMaxListeners } from 'process';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Observable} from 'rxjs';
import { stringify } from '@angular/compiler/src/util';



interface logindetails {
  email: string,
  password: string
}

interface User {
  id?: String,
  Username: string,
  Email?: string,
  Gender: string,
  Contact: string,
  Company: string,
  Image?: string,
  Admin?: boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logindetails: logindetails = {
    email: "",
    password: ""
  }

  private currentProfile: User;
 

  constructor(public afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
        ) { }

  async login() {
    //const delay = ms => new Promise(res => setTimeout(res, ms));

    const user = await this.afAuth.signInWithEmailAndPassword(
      this.logindetails.email,
      this.logindetails.password
    );
    this.showToast("Login Successful!")

    //check currentuser email
    console.log("email:" + (await this.afAuth.currentUser).email)

    this.profileService.getUserByEmail((await this.afAuth.currentUser).email).subscribe(data => this.currentProfile = data[0],
      (err) => console.error(err),
      () => this.CheckUserRole())

  }

  CheckBtn(){
    console.log(this.currentProfile)
    console.log(this.currentProfile.id)
    console.log("----------------------------")
  }

  Validation() {
    if (this.logindetails.email == null) {
      this.showToast('Email cannot be empty!');
      return false
    }
    if (!this.logindetails.email.includes("@")) {
      this.showToast('Email is not valid!');
      return false
    }
    if (this.logindetails.password == null) {
      this.showToast('Password cannot be empty!');
      return false
    }

    return true;
  }

  CheckUserRole(){
    localStorage.setItem('Admin', stringify(this.currentProfile.Admin))
    localStorage.setItem('Email', this.currentProfile.Email)
    if(localStorage.getItem('Admin') == "true"){
      this.router.navigateByUrl("/homeadmin")
    }
    else{
      this.router.navigateByUrl("/homeuser")
    }
  }

  SignIn() {
    this.authService.SignIn(this.logindetails.email, this.logindetails.password).then(() => {
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
    //this.profileService.checkAllUsers()
  }

}
