import { TestBed } from '@angular/core/testing';

import { CosmetiqueService } from './Cosmetique.service';

describe('ArticleService', () => {
  let service: CosmetiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosmetiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
