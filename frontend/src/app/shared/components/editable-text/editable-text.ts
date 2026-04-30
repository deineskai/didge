import { Component, forwardRef, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.html',
  imports: [FormsModule, TextFieldModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableText),
      multi: true,
    },
  ],
})
export class EditableText implements ControlValueAccessor {
  @Input() placeholder = 'Add title...';
  @Input() maxlength = 50;
  @Input() textareaClass = '';

  value: string = '';

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // optional
  }
}
