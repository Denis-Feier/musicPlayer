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
import { MusicPageComponent } from './music-page/music-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NameFilterPipe } from './name-filter.pipe';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'music', component: MusicPageComponent },
  { path: 'admin', component: AdminPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    SigninComponent,
    HomePageComponent,
    AccountPageComponent,
    MusicPageComponent,
    AdminPageComponent,
    NameFilterPipe
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
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
