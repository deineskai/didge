import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HouseholdService } from '../../../core/household-service';
import { Avatar } from '../../../shared/components/avatar/avatar';
import { ContentPageLayout } from '../../../shared/layouts/content-page-layout/content-page-layout';
import { Router } from '@angular/router';
import { Auth } from '../../../core/auth';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/user-service';

@Component({
  selector: 'app-manage-household',
  imports: [Avatar, RouterLink, ContentPageLayout, CommonModule],
  templateUrl: './manage-household.html',
  styleUrl: './manage-household.css',
})
export class ManageHousehold implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  householdService = inject(HouseholdService);
  cdr = inject(ChangeDetectorRef);
  auth = inject(Auth);
  userService = inject(UserService);
  household: any = {};
  current_user_id: number | null = 0;
  firstFriend: any = {};

  ngOnInit() {
    this.current_user_id = this.auth.getUserId();
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadHousehold(Number(id));
      }
    });
    this.userService.getFriends().subscribe({
      next: (friends) => {
        if (friends && friends.length > 0) {
          this.firstFriend = friends[0];
        }
      },
    });
  }

  loadHousehold(id: number) {
    this.householdService.getHousehold(id).subscribe({
      next: (data) => {
        this.household = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.household = null;
      },
    });
  }

  deleteHousehold(id: number) {
    this.householdService.deleteHousehold(id).subscribe({
      next: () => {
        this.router.navigate(['/app/households']);
      },
    });
  }

  removeHouseholdMember(household_id: number, remove_user_id: number) {
    this.householdService.removeHouseholdMember(household_id, remove_user_id).subscribe({
      next: () => {
        if (this.auth.getUserId() == remove_user_id) {
          this.router.navigate(['/app/households']);
        } else {
          this.loadHousehold(household_id);
        }
      },
    });
  }

  leaveHousehold(household_id: number) {
    let remove_user_id: number | null = this.auth.getUserId();
    return remove_user_id ? this.removeHouseholdMember(household_id, remove_user_id) : null;
  }

  inviteToHouseholdModalOpen = false;
  inviteToHouseholdModalError = '';
  inviteToHouseholdModalLoading = false;
  inviteToHouseholdModalUserId: number = 0;

  friends = this.userService.getFriends();

  openInviteToHouseholdModal() {
    this.inviteToHouseholdModalError = '';
    this.inviteToHouseholdModalOpen = true;
    this.inviteToHouseholdModalUserId = this.firstFriend.id;
  }

  sendInvitation() {
    this.householdService
      .sendInvitation(this.inviteToHouseholdModalUserId, this.household.id)
      .subscribe({
        next: (response) => {
          this.loadHousehold(this.household.id);
          this.inviteToHouseholdModalOpen = false;
        },
        error: (err) => {},
      });
  }

  onFriendSelectChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inviteToHouseholdModalUserId = Number(value);
  }
}
