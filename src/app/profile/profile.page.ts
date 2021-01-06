import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService, User } from 'src/app/services/profile.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User = {
    Username: '',
    Email: '',
    Gender:'',
    Contact:'',
    Company:'',

  };

  constructor( private activatedRoute: ActivatedRoute, private ideaService: ProfileService,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    let id = "IjaDqfZ6tqRlu97rLCLQ";
   // let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getUser(id).subscribe(user => {
        this.user = user;
      });
    }
  }

  updateProfile() {
    this.ideaService.updateUser(this.user).then(() => {
      this.router.navigateByUrl('/profile');
      this.showToast('Idea updated');
    }, err => {
      this.showToast('There was a problem updating your profile :(');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
