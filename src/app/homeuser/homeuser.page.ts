import { Component, OnInit } from '@angular/core';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.page.html',
  styleUrls: ['./homeuser.page.scss'],
})
export class HomeuserPage implements OnInit {
 
  private ideas: Observable<Idea[]>;
 
  constructor(private ideaService: FirebaseService) { }
 
  ngOnInit() {
    this.ideas = this.ideaService.getIdeas();
  }
}
