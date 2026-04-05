import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isSidebarOpen = signal(false);
  pageTitle = signal('Page Title');

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  setPageTitle(title: string) {
    this.pageTitle.set(title);
  }
}
