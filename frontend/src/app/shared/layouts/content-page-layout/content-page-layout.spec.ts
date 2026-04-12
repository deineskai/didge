import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPageLayout } from './content-page-layout';

describe('ContentPageLayout', () => {
  let component: ContentPageLayout;
  let fixture: ComponentFixture<ContentPageLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPageLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentPageLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
