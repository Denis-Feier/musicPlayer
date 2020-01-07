import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {Subscription} from 'rxjs';
import {User} from '../shared/user.model';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadMusicService} from '../services/upload-music.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [UsersService],
})
export class AdminPageComponent implements OnInit, OnDestroy {

  usersServiceSubscription: Subscription;
  authServiceSubscription: Subscription;
  users: User[];
  currentUser: User;
  searchText: string;
  songInput: any;
  addSongForm = new FormGroup({
    titleSong: new FormControl('', Validators.required),
    artistSong: new FormControl('', Validators.required),
    dataSong: new FormControl('', Validators.required),
  });

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private uploadMusicService: UploadMusicService,
    private router: Router) {
  }

  ngOnInit() {
    this.usersServiceSubscription = this.usersService.users.subscribe( users => {
      this.users = users;
    });
    this.authServiceSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.usersServiceSubscription.unsubscribe();
    this.authServiceSubscription.unsubscribe();
    this.users.splice(0, this.users.length);
  }

  onSubmit() {
    // console.log(this.addSongForm.value);
    // console.log(this.addSongForm.get('titleSong').value);
    // console.log(this.addSongForm.get('artistSong').value);
    // console.log(this.songInput.item(0)); // this is for upload
    this.uploadMusicService.uploadSong(
      {
        name: this.addSongForm.get('titleSong').value,
        artist: this.addSongForm.get('artistSong').value,
        file: this.songInput.item(0)
      });
    this.addSongForm.get('titleSong').setValue(undefined);
    this.addSongForm.get('artistSong').setValue(undefined);
    this.addSongForm.get('dataSong').setValue(undefined);
    this.songInput = undefined;
  }

  onFileChange(event) {
    this.songInput = event.target.files;
  }

  blockUser(user: User) {
    console.log('Block user: ');
    console.log(user);
    this.usersService.block(user);
  }

  unBlockUser(user: User) {
    console.log('Unblock user: ');
    console.log(user);
    this.usersService.unBlock(user);
  }

  viewProfile(uid: string) {
    this.router.navigate(['/account', uid]);
    this.users.splice(0, this.users.length);
  }
}
