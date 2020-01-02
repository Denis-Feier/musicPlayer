import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {UsersService} from '../services/users.service';
import {merge, Observable, Subscription} from 'rxjs';
import {User} from '../shared/user.model';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy  {

  usersServiceSubscription: Subscription;
  authServiceSubscription: Subscription;
  users: User[];
  currentUser: User;
  searchText: string;
  constructor(private usersService: UsersService, private authService: AuthService) { }

  ngOnInit() {
    this.usersServiceSubscription = this.usersService.users.subscribe( users => {
      this.users = users;
    });
    this.authServiceSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.usersServiceSubscription.unsubscribe();
    this.authServiceSubscription.unsubscribe();
  }

}
