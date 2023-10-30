import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as catActions from '../actions/cat.actions';
import { CatApiService } from 'src/app/services/cat-api.service';

@Injectable()
export class CatEffects {

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catActions.loadPhotos),
      mergeMap(action =>
        this.catApiService.searchPhotos(action.breed, action.limit).pipe(
          map(photos => catActions.photosLoaded({ photos })),
          catchError(() => of(catActions.photosLoadError()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private catApiService: CatApiService
  ) {}
}