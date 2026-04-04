import { Component, OnInit, inject, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/auth';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';
import { Avatar } from '../../shared/components/avatar/avatar';

@Component({
  selector: 'app-friends',
  imports: [CommonModule, FormsModule, ContentPageLayout, Avatar],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends implements OnInit {
  private auth = inject(Auth);
  private cdr = inject(ChangeDetectorRef);
  activeTab = signal<'friends' | 'incoming' | 'outgoing'>('friends');

  friends: any[] = [];
  incomingRequests: any[] = [];
  outgoingRequests: any[] = [];
  modalOpen = false;
  modalUsername = '';
  modalError = '';
  modalLoading = false;

  onSelectChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.setTab(value);
  }

  setTab(tab: any) {
    this.activeTab.set(tab);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.auth.getFriends().subscribe({
      next: (data) => {
        this.friends = data;
        this.cdr.detectChanges();
      },
    });
    this.auth.getIncomingRequests().subscribe({
      next: (data) => {
        this.incomingRequests = data;
        this.cdr.detectChanges();
      },
    });
    this.auth.getOutgoingRequests().subscribe({
      next: (data) => {
        this.outgoingRequests = data;
        this.cdr.detectChanges();
      },
    });
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
      next: () => {
        this.modalOpen = false;
        this.modalLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.modalError = err.error?.detail ?? 'Something went wrong';
        this.modalLoading = false;
        this.cdr.detectChanges();
      },
    });
    this.load();
  }

  respond(requestId: number, accept: boolean) {
    this.auth.respondToFriendRequest(requestId, accept).subscribe({
      next: () => {
        this.load();
      },
    });
  }

  revoke(requestId: number) {
    this.auth.revokeFriendRequest(requestId).subscribe({
      next: () => {
        this.load();
      },
    });
  }

  remove(friend_user_id: number) {
    this.auth.removeFriend(friend_user_id).subscribe({
      next: () => {
        this.load();
      },
    });
  }
}
