import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

 
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

  constructor(private menu: MenuController) { }

  openAdmin() {
    this.menu.enable(true, 'admin');
  }



  ngOnInit() {
    this.openAdmin()
  }


}