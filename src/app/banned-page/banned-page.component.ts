import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-banned-page',
  templateUrl: './banned-page.component.html',
  styleUrls: ['./banned-page.component.css']
})
export class BannedPageComponent implements OnInit, OnDestroy {

  user: User;

  authServiceSubscription: Subscription;

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.user$.subscribe( user => {
      this.user = user;
    });
  }

}
