import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLabel } from './input-label';

describe('InputLabel', () => {
  let component: InputLabel;
  let fixture: ComponentFixture<InputLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputLabel],
    }).compileComponents();

    fixture = TestBed.createComponent(InputLabel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
