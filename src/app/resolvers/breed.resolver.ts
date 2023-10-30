import { ResolveFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CatApiService } from '../services/cat-api.service';
import { inject } from '@angular/core';

import { CatBreed } from '../interfaces/cat.interface';

export const breedResolver: ResolveFn<CatBreed[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(CatApiService).getBreeds();
  };