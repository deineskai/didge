import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverRecipes } from './discover-recipes';

describe('DiscoverRecipes', () => {
  let component: DiscoverRecipes;
  let fixture: ComponentFixture<DiscoverRecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverRecipes],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoverRecipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
