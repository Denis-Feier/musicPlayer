import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/user.model';
import {Subscription} from 'rxjs';
import {PlayListService} from '../services/play-list.service';
import {PlayList} from '../shared/playList.model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  providers:[PlayListService]
})
export class AccountPageComponent implements OnInit, OnDestroy {

  user: User;
  getUserSubscription: Subscription;
  authServiceSubscription: Subscription;
  toNewPlayList = false;
  currentUser: User;
  uid: string;
  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private playListService: PlayListService,
    private authService: AuthService,
    private router: Router,) {
  }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.params.uid;
    this.getUserSubscription = this.afs.doc<User>(`users/${this.uid}`).valueChanges().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );

    this.authServiceSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    })
  }

  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
    this.authServiceSubscription.unsubscribe();
  }

  newPlayList() {
    if(!this.toNewPlayList) {
      this.router.navigate(['create'], {relativeTo: this.activatedRoute});
    }
    else {
      this.router.navigate(['/account', this.activatedRoute.snapshot.params.uid]);
    }
    this.toNewPlayList = !this.toNewPlayList;
  }
}
