import { createReducer, on } from '@ngrx/store';
import { loadPhotos, photosLoaded, photosLoadError } from '../actions/cat.actions';
import { CatPhoto } from "src/app/interfaces/cat.interface";

export const catFeatureKey = 'cat';

export interface State {
  photos: CatPhoto[];
  loading: boolean;
  error: boolean;
}

export const initialState: State = {
  photos: [],
  loading: false,
  error: false
};

export const reducer = createReducer(
  initialState,
  on(loadPhotos, state => ({ ...state, loading: true, error: false })),
  on(photosLoaded, (state, { photos }) => ({ ...state, photos, loading: false })),
  on(photosLoadError, state => ({ ...state, loading: false, error: true }))
);