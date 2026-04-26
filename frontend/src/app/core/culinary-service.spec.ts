import { TestBed } from '@angular/core/testing';

import { CulinaryService } from './culinary-service';

describe('RecipeService', () => {
  let service: CulinaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CulinaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
