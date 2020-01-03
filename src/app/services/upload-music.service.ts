import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Song} from '../shared/song.model';
import {Injectable} from '@angular/core';

@Injectable()
export class UploadMusicService {
  storage;
  basePath = '/music';
  songCollection: AngularFirestoreCollection<Song>;

  constructor(
     private af: AngularFireStorage,
     private db: AngularFirestore
  ) {
    this.storage = af.storage.ref();
    this.songCollection = this.db.collection('songs');
  }

  uploadSong(song: {name: string, artist: string, file: File}) {
    const uploadTask = this.storage.child(`${this.basePath}/${song.file.name}`).put(song.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
          console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error) => {
        console.log(error);
    },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const songDB: Song = {
            artist: song.artist,
            name: song.name,
            songURL: downloadURL,
          };
          this.saveFileData(songDB);
        });
      });
  }

  private saveFileData(songDB: Song) {
    console.log(songDB);
    this.songCollection.add(songDB);
  }
}
