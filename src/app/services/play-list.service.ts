import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {UserToPlayList} from '../shared/userToPlayList.model';
import {PlayList} from '../shared/playList.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {pipe} from 'rxjs';

@Injectable()
export class PlayListService {

  constructor(private authService: AuthService, private afs: AngularFirestore) {}

  getMyPlayList(uid: string) {
    const pipe1 = this.afs.collection('userToPlayList', ref => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map(docRef => docRef.map(d => {
          const data = d.payload.doc.data() as UserToPlayList;
          const id = d.payload.doc.id;
          return {id, ...data};
        })),
        map(value => value.map(c => c.pid)),
      );
    return pipe1.pipe(pidFromUser => pidFromUser.pipe(
      switchMap(v =>
        this.afs.collection('playList', ref => ref.where('pid', 'in', v))
          .snapshotChanges()
          .pipe(
            map(playListRef => playListRef.map(
              d => {
                const data = d.payload.doc.data() as PlayList;
                const pid = d.payload.doc.id;
                return {pid, ...data};
              }
            ))
          )
      )
    ));
  }

  createPlayList(createData:{uid: string, title: string, description: string, privatePolicy: boolean}) {
    const newPlayList: PlayList = {
      description: createData.description,
      owner: createData.uid,
      privatePolicy: createData.privatePolicy,
      title: createData.title,
    };
    this.afs.collection('playList').add(newPlayList).then(refPlayList => {
      const pid = refPlayList.id;
      refPlayList.update({pid});

      const newUserToPlayList: UserToPlayList = {
        uid: createData.uid,
        pid: pid,
      };
      this.afs.collection('userToPlayList').add(newUserToPlayList).then(refuserToPlayList => {
        const id = refuserToPlayList.id;
        refuserToPlayList.update({id});
      })
    });
  }

  editPlayList(playList : PlayList) {
    this.afs.doc(`userToPlayList/${playList.pid}`).update(playList);
  }

  deletePlayList(playListId: string, userID: string) {
    const refCollection = this.afs.collection<UserToPlayList>('userToPlayList').ref;
      refCollection
        .where('pid', '==', playListId)
        .where('uid', '==', userID)
        .get()
        .then(reg => reg.forEach(
          i => {
            this.afs.doc<UserToPlayList>(`userToPlayList/${i.id}`).delete();
          }
        ))
  }

}
