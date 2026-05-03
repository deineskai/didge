import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { EditableText } from '../editable-text/editable-text';
import { NgClass } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-editable-instruction',
  imports: [FormsModule, TextFieldModule, EditableText, NgClass, Icon],
  templateUrl: './editable-instruction.html',
  styleUrl: './editable-instruction.css',
})
export class EditableInstruction {
  @Input() instruction: any;
  @Input() editMode = false;
  @Input() isAddButton = false;

  @Output() summaryChange = new EventEmitter<string>();
  @Output() detailsChange = new EventEmitter<string>();
  @Output() delete = new EventEmitter();

  deleteInstruction() {
    this.delete.emit();
  }
}
