import { TestBed } from '@angular/core/testing';

import { BlockedUsersListService } from './blocked-users-list.service';

describe('BlockedUsersListService', () => {
  let service: BlockedUsersListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockedUsersListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
