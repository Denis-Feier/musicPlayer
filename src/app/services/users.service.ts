import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  taskCollection: AngularFirestoreCollection<User>;
  taskDocument: AngularFirestoreDocument<User>;
  users: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.taskCollection = this.afs.collection('users', ref => ref.orderBy('displayName', 'asc'));
    this.users = this.taskCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }


}
