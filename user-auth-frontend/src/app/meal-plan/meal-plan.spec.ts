import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlan } from './meal-plan';

describe('MealPlan', () => {
  let component: MealPlan;
  let fixture: ComponentFixture<MealPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlan],
    }).compileComponents();

    fixture = TestBed.createComponent(MealPlan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
