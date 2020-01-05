import {Component, OnDestroy, OnInit} from '@angular/core';
import {MusicService} from '../services/music.service';
import {Song} from '../shared/song.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-browser-page',
  templateUrl: './browser-page.component.html',
  styleUrls: ['./browser-page.component.css']
})
export class BrowserPageComponent implements OnInit , OnDestroy {

  songs: Song[];
  musicServiceSubscription: Subscription;
  selectedSong: Song;
  searchText: string;

  constructor(private musicService: MusicService) { }

  playSong(song: Song) {
    this.selectedSong = song;
    console.log(this.selectedSong);
  }

  ngOnInit() {
    this.musicServiceSubscription = this.musicService.songs.subscribe(
      songs => {
        this.songs = songs;
      }
    );
  }

  ngOnDestroy(): void {
    this.musicServiceSubscription.unsubscribe();
  }

  songEnded($event: Event) {
    console.log($event);
  }
}
