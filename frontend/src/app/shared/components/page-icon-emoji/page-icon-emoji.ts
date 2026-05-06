import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Overlay, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { PickerComponent, PickerModule } from '@ctrl/ngx-emoji-mart';

import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-page-icon-emoji',
  imports: [PickerComponent, OverlayModule, PickerModule],
  templateUrl: './page-icon-emoji.html',
  styleUrl: './page-icon-emoji.css',
})
export class PageIconEmoji {
  blockScrollStrategy: ScrollStrategy;
  @Input() emojiId: string | null = null;
  @Input() adjustForCoverImage: boolean = false;
  @Input() isEditable: boolean = false;
  @Output() emojiIdChange = new EventEmitter<string | null>();

  constructor(
    private overlay: Overlay,
    private emojiService: EmojiService,
  ) {
    this.blockScrollStrategy = this.overlay.scrollStrategies.block();
  }

  showEmojiPicker: boolean = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  setEmoji(event: any) {
    this.emojiId = event.emoji.id;
    this.emojiIdChange.emit(this.emojiId);
  }

  getEmojiSvgUrl(id: string): string {
    const emojiData = this.emojiService.getData(id);
    if (!emojiData || !emojiData.unified) return '';
    const unicode = emojiData.unified.toLowerCase();
    return `https://abs.twimg.com/emoji/v2/svg/${unicode}.svg`;
  }

  openPickerIfEditable() {
    if (this.isEditable) {
      this.showEmojiPicker = true;
    }
  }
}
