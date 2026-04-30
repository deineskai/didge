import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableInstruction } from './editable-instruction';

describe('Instruction', () => {
  let component: EditableInstruction;
  let fixture: ComponentFixture<EditableInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableInstruction],
    }).compileComponents();

    fixture = TestBed.createComponent(EditableInstruction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
