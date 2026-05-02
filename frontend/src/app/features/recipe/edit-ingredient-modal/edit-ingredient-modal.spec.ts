import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIngredientModal } from './edit-ingredient-modal';

describe('EditIngredientModal', () => {
  let component: EditIngredientModal;
  let fixture: ComponentFixture<EditIngredientModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIngredientModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditIngredientModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
