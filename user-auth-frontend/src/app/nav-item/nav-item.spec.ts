import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItem } from './nav-item';

describe('NavItem', () => {
  let component: NavItem;
  let fixture: ComponentFixture<NavItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItem],
    }).compileComponents();

    fixture = TestBed.createComponent(NavItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
