import { Component, OnInit } from '@angular/core';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.page.html',
  styleUrls: ['./homeuser.page.scss'],
})
export class HomeuserPage implements OnInit {
 
  private ideas: Observable<Idea[]>;
 
  constructor(private ideaService: FirebaseService, private menu: MenuController) { }

  openUser() {
    this.menu.enable(true, 'user');
  }
 
  ngOnInit() {
    this.ideas = this.ideaService.getIdeas();
    this.openUser();
  }

}
