import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundButton } from './round-button';

describe('RoundButton', () => {
  let component: RoundButton;
  let fixture: ComponentFixture<RoundButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundButton],
    }).compileComponents();

    fixture = TestBed.createComponent(RoundButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
