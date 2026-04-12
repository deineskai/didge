import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  @Input() imageSrc: string = 'https://picsum.photos/200/300';
  @Input() username: string = 'Username';
  @Input() subtitle: string = 'Full Name';
}
