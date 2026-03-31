import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-page-layout',
  imports: [],
  templateUrl: './content-page-layout.html',
  styleUrl: './content-page-layout.css',
})
export class ContentPageLayout {
  @Input() title: string = 'Page Title';
}
