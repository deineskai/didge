import { Component, OnInit, inject, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentPageLayout } from '../../shared/layouts/content-page-layout/content-page-layout';
import { HouseholdService } from '../../core/household-service';
import { Avatar } from '../../shared/components/avatar/avatar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-households',
  imports: [ContentPageLayout, CommonModule, FormsModule, Avatar, RouterLink],
  templateUrl: './households.html',
  styleUrl: './households.css',
})
export class Households {
  private householdService = inject(HouseholdService);
  private cdr = inject(ChangeDetectorRef);

  activeTab = signal<'households' | 'invitations'>('households');
  households: any = [];
  invitations: any = [];

  modalOpen = false;
  modalHouseholdName = '';
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
    this.householdService.getHouseholds().subscribe({
      next: (data) => {
        this.households = data;
        this.cdr.detectChanges();
      },
    });
    this.householdService.getInvitations().subscribe({
      next: (data) => {
        this.invitations = data;
        this.cdr.detectChanges();
      },
    });
  }

  openModal() {
    this.modalHouseholdName = '';
    this.modalError = '';
    this.modalOpen = true;
  }

  createHousehold(name: String = this.modalHouseholdName) {
    this.householdService.createHousehold(name).subscribe({
      next: (response) => {
        this.load();
        this.modalOpen = false;
      },
      error: (err) => {},
    });
  }

  respondToInvitation(invitation_id: number, accept: boolean) {
    this.householdService
      .respondToInvitation((invitation_id = invitation_id), (accept = accept))
      .subscribe({
        next: (response) => {
          this.load();
        },
        error: (err) => {},
      });
  }
}
