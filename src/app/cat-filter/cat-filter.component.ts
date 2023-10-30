import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";

import { State } from 'src/app/store/reducers/cat.reducer';
import { loadPhotos } from 'src/app/store/actions/cat.actions';
import * as fromCatSelectors from 'src/app/store/selectors/cat.selectors';
import { CatBreed, CatPhoto } from '../interfaces/cat.interface';

@Component({
  selector: 'app-cat-filter',
  templateUrl: './cat-filter.component.html',
  styleUrls: ['./cat-filter.component.scss']
})
export class CatFilterComponent implements OnInit  {

  catForm!: FormGroup;
  availableBreeds: CatBreed[] = [];
  limits: number[] = [5, 10, 15, 25, 50, 100];
  photos$: Observable<CatPhoto[]> = this.store.select(fromCatSelectors.selectPhotos);
  isLoading$: Observable<boolean> = this.store.select(fromCatSelectors.selectLoading);
  hasError$: Observable<boolean> = this.store.select(fromCatSelectors.selectError);

  constructor (  
    private fb: FormBuilder,
    private store: Store<State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.catForm = this.fb.group({
      breeds: [['all']],
      limit: [10]
    });
  
    this.availableBreeds = this.route.snapshot.data['breeds'];
    this.loadInitialCats();

  }

  loadInitialCats(): void {
    const breed = this.catForm.value.breeds.includes('all') ? undefined : this.catForm.value.breeds[0];
    const limit = this.catForm.value.limit;
    this.store.dispatch(loadPhotos({ breed: breed, limit: limit }));
  }

  loadCats(): void {
    const formValue = this.catForm.value;
    let selectedBreeds: string[] = formValue.breeds;
    
    if (selectedBreeds.includes('all')) {
      selectedBreeds = [];
    }

    this.store.dispatch(loadPhotos({ breed: selectedBreeds, limit: formValue.limit }));
  }

}
