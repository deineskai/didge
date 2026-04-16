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

  /**
   * @returns 'linux' | 'apple' | 'windows' | 'android' | 'other'
   */
  getUserAgent(): 'linux' | 'apple' | 'windows' | 'android' | 'other' {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('android')) {
      return 'android';
    } else if (/mac|iphone|ipad|ipod/.test(userAgent)) {
      return 'apple';
    } else if (userAgent.includes('win')) {
      return 'windows';
    } else if (userAgent.includes('linux')) {
      return 'linux';
    } else return 'other';
  }
}
