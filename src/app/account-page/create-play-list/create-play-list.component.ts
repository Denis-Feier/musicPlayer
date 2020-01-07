import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PlayListService} from '../../services/play-list.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../shared/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-play-list',
  templateUrl: './create-play-list.component.html',
  styleUrls: ['./create-play-list.component.css'],
})
export class CreatePlayListComponent implements OnInit, OnDestroy {

  createPlayListForm = new FormGroup({
    titlePlayList: new FormControl('', Validators.required),
    descriptionPlayList: new FormControl('', Validators.required),
    privatePlayList: new FormControl(false),
  });

  currentUser: User;
  authServiceSubscription: Subscription;

  constructor(
    private router: Router,
    private playListService: PlayListService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authServiceSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    })
  }

  onSubmit() {
    const titlePlayList = this.createPlayListForm.get('titlePlayList').value;
    const descriptionPlayList = this.createPlayListForm.get('descriptionPlayList').value;
    const privatePlayList = this.createPlayListForm.get('privatePlayList').value;
    console.log(titlePlayList);
    console.log(descriptionPlayList);
    console.log(privatePlayList);
    this.playListService.createPlayList({
      uid: this.currentUser.uid,
      title: titlePlayList,
      description: descriptionPlayList,
      privatePolicy: privatePlayList
    });
    this.createPlayListForm.get('titlePlayList').setValue(undefined);
    this.createPlayListForm.get('descriptionPlayList').setValue(undefined);
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }
}
