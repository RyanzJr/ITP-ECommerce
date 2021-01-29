import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService, User } from 'src/app/services/profile.service';
import { ToastController } from '@ionic/angular';
<<<<<<< Updated upstream
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';
//import { timingSafeEqual } from 'crypto';
=======
import { MenuController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

>>>>>>> Stashed changes

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedFile: any;
  url: any;

  user: User = {
    Username: '',
    Gender:'',
    Contact:'',
    Company:'',
    Image:'',
  };

<<<<<<< Updated upstream
  constructor( private activatedRoute: ActivatedRoute, private ideaService: ProfileService,
    private toastCtrl: ToastController, private router: Router, private store:AngularFireStorage) { }
=======
  constructor( 
    private menu: MenuController,
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private ideaService: ProfileService,
    private toastCtrl: ToastController, 
    private router: Router) { }
>>>>>>> Stashed changes

  ngOnInit() {
    this.doSomething()
  } 

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }

  ionViewWillEnter() {
    let id = "KCl0vEOjUny0wH3Pi8y7";
   // let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getUser(id).subscribe(user => {
        this.user = user;
      });
    }
  }

  chooseFile(event){
    this.selectedFile = event.target.files
  }

  async UploadFile (id, file): Promise<any>{
    if(file && file.length){
      try{
      const task = await this.store.ref('images').child(id).put(file[0])
      return this.store.ref(`images/${id}`).getDownloadURL().toPromise();
    } catch (error){
      console.log(error);}
    }
    
  }

  async updateProfile() {
    this.user.Image = await this.UploadFile(this.user.id,this.selectedFile);
    this.ideaService.updateUser(this.user).then(() => {
      this.router.navigateByUrl('/profile');
      this.showToast('Idea updated');
    }, err => {
      this.showToast('There was a problem updating your profile :(');
    });
    //this.user.Image = await this.UploadFile(this.user.id,this.selectedFile);
    console.log(this.user.Image );
  }

  async doSomething() {
    const user = await this.isLoggedIn()
    if (user) {
      console.log("user is logged in")
      this.openAdminMenu()
    } else {
      console.log("user is NOTNOTNOT logged in")
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
    openAdminMenu() {
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

}

