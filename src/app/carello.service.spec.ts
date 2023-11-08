import { TestBed } from '@angular/core/testing';

import { CarelloService } from './carello.service';

describe('CarelloService', () => {
  let service: CarelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
