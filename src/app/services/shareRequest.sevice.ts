import {Injectable} from '@angular/core';
import {PlayList} from '../shared/playList.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {ShareRequest} from '../shared/shareRequest.model';
import {map} from 'rxjs/operators';
import {User} from '../shared/user.model';
import {UserToPlayList} from '../shared/userToPlayList.model';

@Injectable()
export class ShareRequestService {

  constructor(private afs: AngularFirestore) {

  }

  getShareRequests(uid: string) {
    return this.afs.collection<ShareRequest>('share', ref => ref.where('from', '==', uid))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ShareRequest;
          const id = a.payload.doc.id;
          return {id, ...data};
        })));
  }

  createShareRequest(whoAsked: User, from: string, what: PlayList){
      const thisRequest: ShareRequest = {
        from: from,
        whatID: what.pid,
        whatName: what.title,
        whatDescription: what.description,
        whoAsked: {
          uid: whoAsked.uid,
          email: whoAsked.email,
          displayName: whoAsked.displayName,
          photoURL: whoAsked.photoURL,
          role: whoAsked.role
        }
      };
    this.afs.collection<ShareRequest>('share').add(thisRequest).then( reg => {
      const id = reg.id;
      reg.update({id: id});
    });
  }

  acceptShareRequest(shareRequest: ShareRequest){

    const newUserToPlayList: UserToPlayList = {
      uid: shareRequest.whoAsked.uid,
      pid: shareRequest.whatID,
    };

    this.afs.collection('userToPlayList').add(newUserToPlayList).then(refuserToPlayList => {
      const id = refuserToPlayList.id;
      refuserToPlayList.update({id});
      this.deleteShareRequest(shareRequest);
    })

  }

  deleteShareRequest(shareRequest: ShareRequest) {
    this.afs.doc<ShareRequest>(`share/${shareRequest.id}`).delete();
  }
}
