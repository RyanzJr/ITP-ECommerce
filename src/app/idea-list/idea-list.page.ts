import { Component, OnInit } from '@angular/core';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.page.html',
  styleUrls: ['./idea-list.page.scss'],
})
export class IdeaListPage implements OnInit {

  private ideas: Observable<Idea[]>;
 
  constructor(private ideaService: FirebaseService) { }
 
  ngOnInit() {
    this.ideas = this.ideaService.getIdeas();
  }
}
