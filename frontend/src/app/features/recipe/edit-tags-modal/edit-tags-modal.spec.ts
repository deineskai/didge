import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTagsModal } from './edit-tags-modal';

describe('EditTagsModal', () => {
  let component: EditTagsModal;
  let fixture: ComponentFixture<EditTagsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTagsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTagsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
