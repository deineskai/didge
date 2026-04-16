import { Component, HostListener, Input, inject } from '@angular/core';
import { LayoutService } from '../../layout-service';
import { RoundButton } from '../../components/round-button/round-button';
import { Icon } from '../../components/icon/icon';
import { PageIconEmoji } from '../../components/page-icon-emoji/page-icon-emoji';

@Component({
  selector: 'app-content-page-layout',
  imports: [RoundButton, Icon, PageIconEmoji],
  templateUrl: './content-page-layout.html',
  styleUrl: './content-page-layout.css',
})
export class ContentPageLayout {
  layoutService = inject(LayoutService);
  isScrolled = window.scrollY > 0;
  @Input() title: string = 'Page Title';
  @Input() coverImageSource: string | null = null;
  @Input() emojiId: string | null = null;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
