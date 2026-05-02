import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {
  @Input() value: number = 1;
  @Input() step: number = 1;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() adaptive: boolean = true;

  @Output() valueChange = new EventEmitter<number>();

  private readonly STEP_CONFIG = [
    { threshold: 2000, step: 500 },
    { threshold: 500, step: 100 },
    { threshold: 200, step: 50 },
    { threshold: 100, step: 25 },
    { threshold: 30, step: 10 },
    { threshold: 10, step: 5 },
    { threshold: 1, step: 1 },
    { threshold: 0, step: 0.1 },
  ];

  private getCurrentStep(direction: 'up' | 'down'): number {
    if (!this.adaptive) return this.step;

    const referenceValue =
      direction === 'down' ? Math.abs(this.value) - 0.001 : Math.abs(this.value);

    const match = this.STEP_CONFIG.find((c) => referenceValue >= c.threshold);
    return match ? match.step : 0.1;
  }

  decrease() {
    const step = this.getCurrentStep('down');
    const newValue = this.round(this.value - step);

    if (this.min !== null && newValue < this.min) {
      this.updateValue(this.min);
    } else if (this.min === null && newValue <= 0) {
      return;
    } else {
      this.updateValue(newValue);
    }
  }

  increase() {
    const step = this.getCurrentStep('up');
    const newValue = this.round(this.value + step);

    if (this.max !== null && newValue > this.max) {
      this.updateValue(this.max);
    } else {
      this.updateValue(newValue);
    }
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let val = parseFloat(input.value);

    if (isNaN(val)) {
      val = this.min ?? 1;
    }

    if (this.min !== null && val < this.min) val = this.min;
    if (this.max !== null && val > this.max) val = this.max;

    if (this.min === null && val <= 0) val = 0.1;

    this.updateValue(this.round(val));
  }

  private updateValue(val: number) {
    this.value = val;
    this.valueChange.emit(this.value);
  }

  // Helper to prevent floating point inaccuracies (0.1 + 0.2)
  private round(num: number): number {
    return Math.round(num * 1000) / 1000;
  }
}
