import {Component, OnDestroy, OnInit} from '@angular/core';
import {MusicService} from '../services/music.service';
import {Song} from '../shared/song.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

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
  selectedToAdd: string;
  constructor(private musicService: MusicService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

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

  addThisSong(song: Song) {
    this.selectedToAdd = song.sid;
    this.router.navigate( ['addToPlayList', `${song.sid}`],{relativeTo: this.activatedRoute} );
  }
}
