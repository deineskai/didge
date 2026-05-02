import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableDropdown } from './searchable-dropdown';

describe('SearchableDropdown', () => {
  let component: SearchableDropdown;
  let fixture: ComponentFixture<SearchableDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchableDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchableDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
