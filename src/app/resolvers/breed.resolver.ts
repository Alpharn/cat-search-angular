import { ResolveFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CatApiService } from '../services/cat-api.service';
import { inject } from '@angular/core';

import { ICatBreed } from '../interfaces/cat.interface';

export const breedResolver: ResolveFn<ICatBreed[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(CatApiService).getBreeds();
  };