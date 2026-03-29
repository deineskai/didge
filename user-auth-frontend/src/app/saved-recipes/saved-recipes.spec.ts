import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRecipes } from './saved-recipes';

describe('SavedRecipes', () => {
  let component: SavedRecipes;
  let fixture: ComponentFixture<SavedRecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedRecipes],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedRecipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
