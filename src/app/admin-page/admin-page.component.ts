import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {Subscription} from 'rxjs';
import {User} from '../shared/user.model';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {

  usersServiceSubscription: Subscription;
  authServiceSubscription: Subscription;
  users: User[];
  currentUser: User;
  searchText: string;
  updated = false;
  songInput: any;
  addSongForm = new FormGroup({
    titleSong: new FormControl('', Validators.required),
    artistSong: new FormControl('', Validators.required),
    dataSong: new FormControl('', Validators.required),
  });

  constructor(private usersService: UsersService, private authService: AuthService) {
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
  }

  onSubmit() {
    console.log(this.addSongForm.value);
    console.log(this.songInput.item(0));
  }

  onFileChange(event) {
    this.songInput = event.target.files;
  }
}
