import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';



@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.page.html',
  styleUrls: ['./homeadmin.page.scss'],
})
export class HomeadminPage implements OnInit {

  constructor(
    private menu: MenuController,
    public afAuth: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private profileService: ProfileService) { }

  //checks if currentuser exist  
  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  //these codes run immediately when page is loaded
  async initialize() {
    const user = await this.isLoggedIn()
    if (user) {
      if (localStorage.getItem('Admin') == "true") {
        console.log("User is logged in!")
        this.openAdminMenu()
      }
      else {
        console.log("user tried to go admin")
        this.showToast("You do not have admin privileges!")
        this.router.navigateByUrl("/homeuser")
      }
    } else {
      console.log("user is NOTNOTNOT logged in")
      this.showToast("Please login first!")
      this.router.navigateByUrl("/login")
    }
  }

  //function runs when signout Btn is clicked
  async logOut() {
<<<<<<< Updated upstream
    this.SignOut()
    this.showToast("Sign Out Successful!")
    console.log("user has logged out")
    console.log("email:" + (await this.afAuth.currentUser).email)
    this.router.navigateByUrl("/home")
  }

  //set menu as admin menu
=======
      this.SignOut()
      this.showToast("Sign Out Successful!")
      console.log("user has logged out")
      console.log("email:" + (await this.afAuth.currentUser).email)
      this.router.navigateByUrl("/home")
    }
>>>>>>> Stashed changes
  openAdminMenu() {
    this.menu.enable(true, 'admin');
  }

<<<<<<< Updated upstream
  //signs user out
=======

>>>>>>> Stashed changes
  SignOut() {
    this.authService.SignOut().then(() => {
      console.log(this.afAuth.currentUser)
    }, err => {
      this.showToast('There a problem signing out :(');
    });
  }

  //function for displaying toasts
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  //function runs on init
  ngOnInit() {
    //this.profileService.checkAllUsers()
    this.initialize()
  }


}