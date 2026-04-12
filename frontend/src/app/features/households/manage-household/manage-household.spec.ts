import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHousehold } from './manage-household';

describe('ManageHousehold', () => {
  let component: ManageHousehold;
  let fixture: ComponentFixture<ManageHousehold>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageHousehold],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageHousehold);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
