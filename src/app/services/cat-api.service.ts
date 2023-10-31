import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICatBreed, ICatPhoto } from '../interfaces/cat.interface';

@Injectable({
  providedIn: 'root'
})

export class CatApiService {

  private url = 'https://api.thecatapi.com/v1';

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<ICatBreed[]> {
    return this.http.get<ICatBreed[]>(`${this.url}/breeds`);
  }

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
