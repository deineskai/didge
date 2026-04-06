import { Component, OnInit, inject, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/auth';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';
import { Avatar } from '../../shared/components/avatar/avatar';
import { HouseholdService } from '../../core/household-service';
import { UserService } from '../../core/user-service';

@Component({
  selector: 'app-friends',
  imports: [CommonModule, FormsModule, ContentPageLayout, Avatar],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends implements OnInit {
  auth = inject(Auth);
  cdr = inject(ChangeDetectorRef);
  householdService = inject(HouseholdService);
  userService = inject(UserService);
  firstHousehold: any;

  activeTab = signal<'friends' | 'incoming' | 'outgoing'>('friends');

  friends: any[] = [];
  incomingRequests: any[] = [];
  outgoingRequests: any[] = [];

  addFriendModalOpen = false;
  addFriendModalUsername = '';
  addFriendModalError = '';
  addFriendModalLoading = false;

  onSelectChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.setTab(value);
  }

  setTab(tab: any) {
    this.activeTab.set(tab);
  }

  ngOnInit() {
    this.householdService.getHouseholds().subscribe({
      next: (households) => {
        if (households && households.length > 0) {
          this.firstHousehold = households[0];
        }
      },
    });
    this.load();
  }

  load() {
    this.userService.getFriends().subscribe({
      next: (data) => {
        this.friends = data;
        this.cdr.detectChanges();
      },
    });
    this.userService.getIncomingRequests().subscribe({
      next: (data) => {
        this.incomingRequests = data;
        this.cdr.detectChanges();
      },
    });
    this.userService.getOutgoingRequests().subscribe({
      next: (data) => {
        this.outgoingRequests = data;
        this.cdr.detectChanges();
      },
    });
  }

  openAddFriendModal() {
    this.addFriendModalUsername = '';
    this.addFriendModalError = '';
    this.addFriendModalOpen = true;
  }

  sendRequest() {
    if (!this.addFriendModalUsername.trim()) return;
    this.addFriendModalLoading = true;
    this.addFriendModalError = '';
    this.userService.sendFriendRequest(this.addFriendModalUsername.trim()).subscribe({
      next: () => {
        this.addFriendModalOpen = false;
        this.addFriendModalLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.addFriendModalError = err.error?.detail ?? 'Something went wrong';
        this.addFriendModalLoading = false;
        this.cdr.detectChanges();
      },
    });
    this.load();
  }

  respond(requestId: number, accept: boolean) {
    this.userService.respondToFriendRequest(requestId, accept).subscribe({
      next: () => {
        this.load();
      },
    });
  }

  revoke(requestId: number) {
    this.userService.revokeFriendRequest(requestId).subscribe({
      next: () => {
        this.load();
      },
    });
  }

  remove(friend_user_id: number) {
    this.userService.removeFriend(friend_user_id).subscribe({
      next: () => {
        this.load();
      },
    });
  }

  inviteToHouseholdModalOpen = false;
  inviteToHouseholdModalHouseholdId = 0;
  inviteToHouseholdModalError = '';
  inviteToHouseholdModalLoading = false;
  inviteToHouseholdModalUser: any = {};

  households = this.householdService.getHouseholds();

  openInviteToHouseholdModal(user: any) {
    this.inviteToHouseholdModalHouseholdId = this.firstHousehold.id;
    this.inviteToHouseholdModalError = '';
    this.inviteToHouseholdModalOpen = true;
    this.inviteToHouseholdModalUser = user;
  }

  sendInvitation() {
    this.householdService
      .sendInvitation(this.inviteToHouseholdModalUser.id, this.inviteToHouseholdModalHouseholdId)
      .subscribe({
        next: (response) => {
          this.load();
          this.inviteToHouseholdModalOpen = false;
        },
        error: (err) => {},
      });
  }

  onHouseholdSelectChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inviteToHouseholdModalHouseholdId = Number(value);
  }
}
