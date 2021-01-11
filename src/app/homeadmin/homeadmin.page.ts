import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


 
@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.page.html',
  styleUrls: ['./homeadmin.page.scss'],
})
export class HomeadminPage implements OnInit {

  constructor(private menu: MenuController,
    public afAuth: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController,
    private authService: AuthService) { }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }

 async doSomething() {
  const user = await this.isLoggedIn()
  if (user) {
    console.log("user is logged in")
  } else {
    console.log("user is NOT NOT logged in")
    this.showToast("Please login first!")
    this.router.navigateByUrl("/login")
 }
}

  async logOut() {
      this.SignOut()
      this.showToast("Sign Out Successful!")
      console.log("user has logged out")
      console.log("email:" + (await this.afAuth.currentUser).email)
      this.router.navigateByUrl("/home")
    }

  openAdmin() {
    this.menu.enable(true, 'admin');
  }

  SignOut() {
    this.authService.SignOut().then(() => {
    }, err => {
      this.showToast('There a problem signing out :(');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  ngOnInit() {
    this.doSomething()
  }


}