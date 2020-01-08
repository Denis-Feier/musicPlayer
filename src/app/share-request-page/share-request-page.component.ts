import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ShareRequest} from '../shared/shareRequest.model';
import {ShareRequestService} from '../services/shareRequest.sevice';
import {AuthService} from '../services/auth.service';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-share-request-page',
  templateUrl: './share-request-page.component.html',
  styleUrls: ['./share-request-page.component.css'],
  providers: [ShareRequestService]
})
export class ShareRequestPageComponent implements OnInit, OnDestroy {
  shareRequests: { whatDescription: string; whatID: string; from: string; id: string; whoAsked: User; whatName: string }[];
  currentUser: User;
  authServiceSubscription: Subscription;
  shareRequestServiceSubscription: Subscription;
  youHaveRequest: boolean;
  constructor(
    private shareRequestService: ShareRequestService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.authServiceSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
      this.shareRequestServiceSubscription = this.shareRequestService.getShareRequests(this.currentUser.uid).subscribe(
        requests => {
          this.shareRequests = requests;
          this.youHaveRequest = this.shareRequests.length !== 0;
        }
      );
    })
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
    this.shareRequestServiceSubscription.unsubscribe();
  }

  acceptRequest(request: { whatDescription: string; whatID: string; from: string; id: string; whoAsked: User; whatName: string }) {
    this.shareRequestService.acceptShareRequest(request);
  }

  rejectRequest(request: { whatDescription: string; whatID: string; from: string; id: string; whoAsked: User; whatName: string }) {
    this.shareRequestService.deleteShareRequest(request);
  }
}
