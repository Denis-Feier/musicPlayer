import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';
import {PlayListService} from '../../services/play-list.service';
import {AuthService} from '../../services/auth.service';
import {Observable, Subscription} from 'rxjs';
import {Song} from '../../shared/song.model';

@Component({
  selector: 'app-play-your-play-list',
  templateUrl: './play-your-play-list.component.html',
  styleUrls: ['./play-your-play-list.component.css']
})
export class PlayYourPlayListComponent implements OnInit , OnDestroy {
  songs: { artist: string; name: string; songURL: string; sid: string }[];
  pid: string;
  playListServiceSubscription: Subscription;
  selectedSong: Song;
  songIndex = 0;


  constructor(private afs: AngularFirestore,
              private activatedRoute: ActivatedRoute,
              private playListService: PlayListService,
              private authService: AuthService) { }

  ngOnInit() {
    this.pid = this.activatedRoute.snapshot.params.pid;
    this.playListServiceSubscription = this.playListService.getSongFromPlayList(this.pid).subscribe(songs => {
      this.songs = songs;
      this.selectedSong = this.songs[0];
    });
  }

  ngOnDestroy(): void {
    this.playListServiceSubscription.unsubscribe();
  }

  playSong(song: Song, index: number) {
    console.log(song);
    console.log(index);
    this.songIndex = index;
    this.selectedSong = this.songs[index];
  }

  songEnded($event: Event) {
    this.songIndex++;
    if(this.songIndex <= this.songs.length){
      this.selectedSong = this.songs[this.songIndex];
    }
  }
}
