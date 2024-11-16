import { TestBed } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { CosmetiqueGuard } from './cosmetique.guard';
import { Observable } from 'rxjs';

describe('CosmetiqueGuard', () => {
  let guard: CosmetiqueGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CosmetiqueGuard],
    });

    guard = TestBed.inject(CosmetiqueGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true or UrlTree or Observable or Promise', () => {
    const canActivateResult: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> =
      guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [CosmetiqueGuard],
        });
      });
    
      it('should be created', () => {
        const guard = TestBed.inject(CosmetiqueGuard);
        expect(guard).toBeTruthy();
      });
    
  });
});


 



