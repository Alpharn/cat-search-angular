import { createAction, props } from '@ngrx/store';
import { ICatPhoto } from 'src/app/interfaces/cat.interface';

/**
 * Triggers a request to load cat photos.
 *
 * @param breed Array of breed IDs to filter the photos.
 * 
 * @param limit The maximum number of photos to return.
 */
export const loadPhotos = createAction('[Cat Component] Load Photos', props<{ breed: string[]; limit: number }>());

/**
 * This action is dispatched when the Cat API successfully returns photos.
 *
 * @param photos Array of CatPhoto objects that contain the details of each photo.
 */
export const photosLoaded = createAction('[Cat API] Photos Loaded Success', props<{ photos: ICatPhoto[] }>());

/** Represents an error that occurred while loading cat photos. */
export const photosLoadError = createAction('[Cat API] Photos Load Error');