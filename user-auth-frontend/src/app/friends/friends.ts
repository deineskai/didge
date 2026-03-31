import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';
import { Icon } from '../icon/icon';
import { ContentPageLayout } from '../layouts/content-page-layout/content-page-layout';

@Component({
  selector: 'app-friends',
  imports: [CommonModule, FormsModule, Icon, ContentPageLayout],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends implements OnInit {
  private auth = inject(Auth);
  private cdr = inject(ChangeDetectorRef);

  friends: any[] = [];
  incomingRequests: any[] = [];
  modalOpen = false;
  modalUsername = '';
  modalError = '';
  modalLoading = false;

  ngOnInit() {
    this.load();
  }

  load() {
    this.auth.getFriends().subscribe({ next: data => { this.friends = data; this.cdr.detectChanges(); } });
    this.auth.getIncomingRequests().subscribe({ next: data => { this.incomingRequests = data; this.cdr.detectChanges(); } });
  }

  openModal() {
    this.modalUsername = '';
    this.modalError = '';
    this.modalOpen = true;
  }

  sendRequest() {
    if (!this.modalUsername.trim()) return;
    this.modalLoading = true;
    this.modalError = '';
    this.auth.sendFriendRequest(this.modalUsername.trim()).subscribe({
      next: () => { this.modalOpen = false; this.modalLoading = false; this.cdr.detectChanges(); },
      error: (err) => { this.modalError = err.error?.detail ?? 'Something went wrong'; this.modalLoading = false; this.cdr.detectChanges(); }
    });
  }

  respond(requestId: number, accept: boolean) {
    this.auth.respondToRequest(requestId, accept).subscribe({
      next: () => { this.load(); }
    });
  }
}
