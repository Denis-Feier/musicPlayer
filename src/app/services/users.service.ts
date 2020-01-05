import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs/';
import {map} from 'rxjs/operators';
import {User} from '../shared/user.model';

@Injectable()
export class UsersService {

  taskCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.taskCollection = this.afs.collection('users');
    this.users = this.taskCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const uid = a.payload.doc.id;
        return {uid, ...data};
      })),
    );
  }

  block(user: User) {
    const newUser: User = {
      uid: user.uid,
      role: 'banned',
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email
    };
    this.afs.doc(`users/${user.uid}`).update(newUser);
  }

  unBlock(user: User) {
    const newUser: User = {
      uid: user.uid,
      role: 'user',
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email
    };
    this.afs.doc(`users/${user.uid}`).update(newUser);
  }
}
