import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableText } from './editable-text';

describe('EditableText', () => {
  let component: EditableText;
  let fixture: ComponentFixture<EditableText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableText],
    }).compileComponents();

    fixture = TestBed.createComponent(EditableText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
