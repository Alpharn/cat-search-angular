/**
 * Resolver function for fetching cat breeds before navigating to a route.
 * This uses the `CatApiService` to fetch breeds and ensures that the data is available
 * before the route is activated.
 */
import { ResolveFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CatApiService } from '../services/cat-api.service';
import { inject } from '@angular/core';

import { ICatBreed } from '../interfaces/cat.interface';

/**
 * The resolver function for cat breeds.
 *
 * @param route The active route snapshot that contains the information about the active route.
 * 
 * @param state The router state snapshot that contains the information about the router state.
 * 
 * @returns An Observable that resolves to an array of `ICatBreed` once the data is fetched from the API.
 */
export const breedResolver: ResolveFn<ICatBreed[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(CatApiService).getBreeds();
  };