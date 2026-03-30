import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavIcon } from './nav-icon';

describe('NavIcon', () => {
  let component: NavIcon;
  let fixture: ComponentFixture<NavIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(NavIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
