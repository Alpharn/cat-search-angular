import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICatBreed, ICatPhoto } from '../interfaces/cat.interface';

/**
 * Service to interact with TheCatAPI for retrieving cat breeds and searching for cat photos.
 */
@Injectable({
  providedIn: 'root'
})

export class CatApiService {

  private url = 'https://api.thecatapi.com/v1';

  constructor(private http: HttpClient) {}

  /**
   * Fetches a list of cat breeds from TheCatAPI.
   * 
   * @returns An `Observable` of `ICatBreed[]` containing the list of cat breeds.
   */
  getBreeds(): Observable<ICatBreed[]> {
    return this.http.get<ICatBreed[]>(`${this.url}/breeds`);
  }

  /**
   * Searches for cat photos based on provided breed IDs and limit.
   * 
   * @param breeds An array of breed IDs to filter the search. An empty array or absence of 'none' will fetch all breeds.
   * 
   * @param limit The maximum number of cat photos to return.
   * 
   * @returns An `Observable` of `ICatPhoto[]` containing the search results.
   */
  searchPhotos(breeds: string[] = [], limit: number = 10): Observable<ICatPhoto[]> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('has_breeds', breeds.includes('none') ? '0' : '1');
  
    if (breeds.length && !breeds.includes('none')) {
      params = params.set('breed_ids', breeds.join(','));
    }
  
    return this.http.get<ICatPhoto[]>(`${this.url}/images/search`, { params });
  }
}
