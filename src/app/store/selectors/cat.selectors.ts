import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCat from '../reducers/cat.reducer';

export const selectCatState = createFeatureSelector<fromCat.State>(fromCat.catFeatureKey);

export const selectPhotos = createSelector(
  selectCatState,
  state => state.photos
);

export const selectLoading = createSelector(
  selectCatState,
  state => state.loading
);

export const selectError = createSelector(
  selectCatState,
  state => state.error
);