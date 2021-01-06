import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { RouterModule } from '@angular/router';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})

export class HomePage implements OnInit{

  private ideas: Observable<Idea[]>;
 
  constructor(private ideaService: FirebaseService, private menu: MenuController) { }

  openPublic() {
    this.menu.enable(true, 'public');
  }
  
  ngOnInit() {
    this.ideas = this.ideaService.getIdeas();
    this.openPublic();
  }



}



