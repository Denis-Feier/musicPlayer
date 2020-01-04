import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Song} from '../shared/song.model';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  songs: Observable<Song[]>;
  songsCollection: AngularFirestoreCollection<Song>;

  constructor(private afs: AngularFirestore) {
    this.songsCollection = this.afs.collection('songs', ref => ref.orderBy('name', 'asc'));
    this.songs = this.songsCollection.snapshotChanges().pipe(
      map(songs => songs.map( s => {
        const data = s.payload.doc.data() as Song;
        const id = s.payload.doc.id;
        return {id, ...data};
      })),
    );
  }

}
