import { TestBed } from '@angular/core/testing';

import { ImpfungStoreService } from './impfung-store.service';

describe('ImpfungStoreService', () => {
  let service: ImpfungStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpfungStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
