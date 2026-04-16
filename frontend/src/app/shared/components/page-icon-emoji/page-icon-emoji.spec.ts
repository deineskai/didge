import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIconEmoji } from './page-icon-emoji';

describe('PageIconEmoji', () => {
  let component: PageIconEmoji;
  let fixture: ComponentFixture<PageIconEmoji>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageIconEmoji],
    }).compileComponents();

    fixture = TestBed.createComponent(PageIconEmoji);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
