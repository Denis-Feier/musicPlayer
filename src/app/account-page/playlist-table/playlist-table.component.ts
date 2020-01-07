import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';
import {PlayListService} from '../../services/play-list.service';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../../shared/user.model';
import {PlayList} from '../../shared/playList.model';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.css']
})
export class PlaylistTableComponent implements OnInit, OnDestroy {

  authServiceSubscription: Subscription;
  myPlayListSubscription: Subscription;
  currentUser: User;
  myPlayLists: { owner: string; privatePolicy: boolean; description: string; pid: string; title: string }[];
  searchText: string;
  uid: string;

  constructor(private afs: AngularFirestore,
              private activatedRoute: ActivatedRoute,
              private playListService: PlayListService,
              private authService: AuthService) { }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.params.uid;
    this.authServiceSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });

    this.myPlayListSubscription = this.playListService.getMyPlayList(this.uid).subscribe(playLists => {
        this.myPlayLists = playLists;
      }
    );
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
    this.authServiceSubscription.unsubscribe();
  }

  onDelete(playLists: { owner: string; privatePolicy: boolean; description: string; pid: string; title: string }) {
    this.playListService.deletePlayList(playLists.pid, this.currentUser.uid);
  }
}
