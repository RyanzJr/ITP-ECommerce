import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService, User } from 'src/app/services/profile.service';
import { ToastController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MenuController } from '@ionic/angular';
//import { timingSafeEqual } from 'crypto';

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
    Gender: '',
    Contact: '',
    Company: '',
    Image: '',
    id: '',
  };

  constructor(private activatedRoute: ActivatedRoute, private ideaService: ProfileService,
    private toastCtrl: ToastController, private router: Router, private store: AngularFireStorage, private menu: MenuController) { }

  ngOnInit() {
    this.openAdminMenu()
  }
  ionViewWillEnter() {
    let id = "KCl0vEOjUny0wH3Pi8y7";
    //let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getUser(id).subscribe(user => {
        this.user = user;
        console.log(this.user)
      });
    }
  }

  //set menu as admin menu
  openAdminMenu() {
    this.menu.enable(true, 'admin');
  }

  chooseFile(event) {
    this.selectedFile = event.target.files
  }

  async UploadFile(id, file): Promise<any> {
    if (file && file.length) {
      try {
        const task = await this.store.ref('images').child(id).put(file[0])
        return this.store.ref(`images/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }

  }

  async updateProfile() {
    this.url = await this.UploadFile(this.user.id, this.selectedFile);
    if (this.url != null){
      this.user.Image = this.url
    }
        this.ideaService.updateUser(this.user).then(() => {
        this.router.navigateByUrl('/profile');
        this.showToast('Idea updated');
      }, err => {
        this.showToast('There was a problem updating your profile :(');
        console.log(err)
      });
    //this.user.Image = await this.UploadFile(this.user.id,this.selectedFile);
      console.log(this.user.Image);
  
}

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}