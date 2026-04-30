import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { EditableText } from '../editable-text/editable-text';

@Component({
  selector: 'app-editable-instruction',
  imports: [FormsModule, TextFieldModule, EditableText],
  templateUrl: './editable-instruction.html',
  styleUrl: './editable-instruction.css',
})
export class EditableInstruction {
  @Input() stepNumber!: number;
  @Input() summary!: string;
  @Input() details!: string;
  @Input() editMode = false;

  @Output() summaryChange = new EventEmitter<string>();
  @Output() detailsChange = new EventEmitter<string>();
}
