import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';
import {User} from '../shared/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit, OnDestroy {

  user: User;
  getUserSubscription: Subscription;

  constructor( private afs: AngularFirestore, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const uid = this.activatedRoute.snapshot.params.uid;
    this.getUserSubscription = this.afs.doc<User>(`users/${uid}`).valueChanges().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );
  }

  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
  }

}
