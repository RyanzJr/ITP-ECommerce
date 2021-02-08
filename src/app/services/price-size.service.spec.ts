import { TestBed } from '@angular/core/testing';

import { PriceSizeService } from './price-size.service';

describe('PriceSizeService', () => {
  let service: PriceSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
