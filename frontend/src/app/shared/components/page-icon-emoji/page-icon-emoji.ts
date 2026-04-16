import { Component, Input } from '@angular/core';
import { Overlay, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-page-icon-emoji',
  imports: [PickerComponent, EmojiComponent, OverlayModule],
  templateUrl: './page-icon-emoji.html',
  styleUrl: './page-icon-emoji.css',
})
export class PageIconEmoji {
  blockScrollStrategy: ScrollStrategy;
  @Input() emojiId: string | null = null;
  @Input() adjustForCoverImage: boolean = false;

  constructor(private overlay: Overlay) {
    this.blockScrollStrategy = this.overlay.scrollStrategies.block();
  }

  showEmojiPicker: boolean = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  setEmoji(event: any) {
    this.emojiId = event.emoji.id;
  }
}
