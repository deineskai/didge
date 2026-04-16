import { Component, HostListener, Input, inject } from '@angular/core';
import { LayoutService } from '../../layout-service';
import { RoundButton } from '../../components/round-button/round-button';
import { Icon } from '../../components/icon/icon';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { Overlay, OverlayModule, CdkOverlayOrigin, ScrollStrategy } from '@angular/cdk/overlay';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-content-page-layout',
  imports: [RoundButton, Icon, PickerComponent, OverlayModule, CdkOverlayOrigin, EmojiComponent],
  templateUrl: './content-page-layout.html',
  styleUrl: './content-page-layout.css',
})
export class ContentPageLayout {
  layoutService = inject(LayoutService);
  isScrolled = window.scrollY > 0;
  @Input() title: string = 'Page Title';
  @Input() coverImageSource: string | null = null;
  @Input() emojiId: string | null = null;
  private emojiService = inject(EmojiService);

  getNativeEmoji(id: string): string {
    const emojiData = this.emojiService.getData(id);

    if (!emojiData || !emojiData.unified) {
      return '❓';
    }

    return emojiData.unified
      .split('-')
      .map((code) => String.fromCodePoint(parseInt(code, 16)))
      .join('');
  }

  userAgentLinuxOrApple(): boolean {
    return (
      this.layoutService.getUserAgent().includes('apple') ||
      this.layoutService.getUserAgent().includes('linux')
    );
  }

  blockScrollStrategy: ScrollStrategy;
  showEmojiPicker: boolean = false;

  constructor(private overlay: Overlay) {
    this.blockScrollStrategy = this.overlay.scrollStrategies.block();
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  setEmoji(event: any) {
    this.emojiId = event.emoji.id;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
