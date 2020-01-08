import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayList} from '../../shared/playList.model';
import {PlayListService} from '../../services/play-list.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../shared/user.model';
import {MusicService} from '../../services/music.service';
import {Song} from '../../shared/song.model';

@Component({
  selector: 'app-add-to-play-list',
  templateUrl: './add-to-play-list.component.html',
  styleUrls: ['./add-to-play-list.component.css'],
  providers: [PlayListService]
})
export class AddToPlayListComponent implements OnInit, OnDestroy {

  searchText: string;
  myPlayLists: { owner: string; privatePolicy: boolean; description: string; pid: string; title: string }[];
  sid: string;
  authServiceSubscription : Subscription;
  currentUser: User;
  selectedSong: Song;
  musicServiceSubscription: Subscription;
  paramsSubscription: Subscription;

  constructor(private playListService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private musicService: MusicService) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params.subscribe( params => {
        this.sid = params['sid'];
        console.log(this.sid);
      this.authServiceSubscription = this.authService.user$.subscribe(user => {
        this.currentUser = user;
        this.playListService.getMyPlayList(this.currentUser.uid).subscribe(
          playLists => {
            this.myPlayLists = playLists;
          }
        );
      });

      this.musicServiceSubscription = this.musicService.getSongByID(this.sid).subscribe(song => {
        this.selectedSong = song;
      })

    });


  }

  addToThisPlayList(playLists: PlayList) {
    this.playListService.addSongToPlayList(playLists.pid, this.sid);
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
    this.musicServiceSubscription.unsubscribe();
  }
}
