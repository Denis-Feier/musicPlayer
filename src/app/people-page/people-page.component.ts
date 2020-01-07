import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {Subscription} from 'rxjs';
import {User} from '../shared/user.model';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {PlayListService} from '../services/play-list.service';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.css'],
  providers: [UsersService],
})
export class PeoplePageComponent implements OnInit, OnDestroy {

  usersServiceSubscription: Subscription;
  users: User[];
  currentUser: User;
  authServiceSubscription: Subscription;
  searchText: string;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router) { }

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

  viewProfile(uid: number) {
    this.router.navigate(['/account', uid]);
  }
}
