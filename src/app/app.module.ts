import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SigninComponent } from './signin/signin.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment.prod';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './services/auth.service';
import { HomePageComponent } from './home-page/home-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NameFilterPipe } from './name-filter.pipe';
import {UploadMusicService} from './services/upload-music.service';
import { BannedPageComponent } from './banned-page/banned-page.component';
import { BrowserPageComponent } from './browser-page/browser-page.component';
import { PeoplePageComponent } from './people-page/people-page.component';
import {MusicService} from './services/music.service';
import { PlaylistTableComponent } from './account-page/playlist-table/playlist-table.component';
import { CreatePlayListComponent } from './account-page/create-play-list/create-play-list.component';
import { AddToPlayListComponent } from './browser-page/add-to-play-list/add-to-play-list.component';
import { PlayYourPlayListComponent } from './account-page/play-your-play-list/play-your-play-list.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'account/:uid', component: AccountPageComponent, children:[
      {path: '', component: PlaylistTableComponent},
      {path: 'create', component: CreatePlayListComponent},
      {path: 'play/:pid', component: PlayYourPlayListComponent},
    ]},
  { path: 'people', component: PeoplePageComponent },
  { path: 'admin', component: AdminPageComponent},
  { path: 'browse', component: BrowserPageComponent, children:[
      {path: 'addToPlayList/:sid', component: AddToPlayListComponent}
    ]}
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    SigninComponent,
    HomePageComponent,
    AccountPageComponent,
    AdminPageComponent,
    NameFilterPipe,
    BannedPageComponent,
    BrowserPageComponent,
    PeoplePageComponent,
    PlaylistTableComponent,
    CreatePlayListComponent,
    AddToPlayListComponent,
    PlayYourPlayListComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, UploadMusicService, MusicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
