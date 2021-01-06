import { Component, OnInit } from '@angular/core';
import { ProfileService, User } from 'src/app/services/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
})
export class AccountListPage implements OnInit {

  private users: Observable<User[]>;

  constructor(private profileService: ProfileService) { }
 
  ngOnInit() {
    this.users = this.profileService.getUsers();
  }

}
