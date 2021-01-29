import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.page.html',
  styleUrls: ['./homeuser.page.scss'],
})
export class HomeuserPage implements OnInit {


  constructor(private menu: MenuController,
    public afAuth: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController,
    private authService: AuthService) { }

  //checks if currentuser exist  
  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  //these codes run immediately when page is loaded
  async initialize() {
    const user = await this.isLoggedIn()
    if (user) {
      if (localStorage.getItem('Admin') == "false") {
        console.log("User is logged in!")
        this.openUserMenu()
      }
      else {
        console.log("admin tried to go user")
        this.showToast("You do not have user privileges!")
        this.router.navigateByUrl("/homeadmin")
      }
    } else {
      console.log("user is NOTNOTNOT logged in")
      this.showToast("Please login first!")
      this.router.navigateByUrl("/login")
    }
  }

  //function runs when signout Btn is clicked
  async logOut() {
    this.SignOut()
    this.showToast("Sign Out Successful!")
    console.log("user has logged out")
    console.log("email:" + (await this.afAuth.currentUser).email)
    this.router.navigateByUrl("/home")
  }

  //set menu as admin menu
  openUserMenu() {
    this.menu.enable(true, 'user');
  }

  //signs user out
  SignOut() {
    this.authService.SignOut().then(() => {
    }, err => {
      this.showToast('There a problem signing out :(');
    });
  }

  //function for showing toasts
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  //function runs on init
  ngOnInit() {
    this.initialize()
  }


}
