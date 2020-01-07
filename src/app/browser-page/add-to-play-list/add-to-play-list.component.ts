import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayList} from '../../shared/playList.model';
import {PlayListService} from '../../services/play-list.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../shared/user.model';

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
  addInPlayList = new Map();
  constructor(private playListService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.sid = this.activatedRoute.snapshot.params.sid;
    this.authServiceSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
      this.playListService.getMyPlayList(this.currentUser.uid).subscribe(
        playLists => {
          this.myPlayLists = playLists;
          this.myPlayLists.forEach(value => {
            this.addInPlayList.set(value.pid, 0);
          })
        }
      );
    })
  }

  addToThisPlayList(playLists: PlayList) {
    this.playListService.addSongToPlayList(playLists.pid, this.sid);
    this.addInPlayList.set(playLists.pid, this.addInPlayList.get(playLists.pid) + 1);
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }
}
