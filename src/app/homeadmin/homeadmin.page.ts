import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { ToastController } from '@ionic/angular';
 
@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.page.html',
  styleUrls: ['./homeadmin.page.scss'],
})
export class HomeadminPage implements OnInit {
 
  idea: Idea = {
    name: '',
    notes: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private ideaService: FirebaseService,
    private toastCtrl: ToastController, private router: Router) { }
 

  ngOnInit() {
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getIdea(id).subscribe(idea => {
        this.idea = idea;
      });
    }
  }

  addIdea() {
    this.ideaService.addIdea(this.idea).then(() => {
      this.router.navigateByUrl('/homeuser');
      this.showToast('Idea added');
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
 


}