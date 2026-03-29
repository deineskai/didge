import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Households } from './households';

describe('Households', () => {
  let component: Households;
  let fixture: ComponentFixture<Households>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Households],
    }).compileComponents();

    fixture = TestBed.createComponent(Households);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
