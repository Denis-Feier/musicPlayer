import {Component, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  userPic: string | undefined;

  authServiceSubscription: Subscription;

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver) {}

  logout() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.user$.subscribe( user => {
      this.userPic = user.photoURL;
    });
  }
}
