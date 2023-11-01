import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

import { State } from 'src/app/store/reducers/cat.reducer';
import { loadPhotos } from 'src/app/store/actions/cat.actions';
import * as fromCatSelectors from 'src/app/store/selectors/cat.selectors';
import { ICatBreed, ICatPhoto, ICatFormValues } from '../interfaces/cat.interface';

/**
 * CatFilterComponent manages the selection of cat breeds and the quantity of cat photos
 * to be displayed.
 */
@Component({
  selector: 'app-cat-filter',
  templateUrl: './cat-filter.component.html',
  styleUrls: ['./cat-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CatFilterComponent implements OnInit  {
  
  /** Form group to handle breed and photo quantity filters */
  catForm!: FormGroup;

  /** List of all available cat breeds fetched from the route's data */
  availableBreeds: ICatBreed[] = [];

  /** Predefined limits for the number of photos to display */
  limits: number[] = [5, 10, 15, 25, 50, 100];
  
  /** Observable stream of cat photos */
  photos$: Observable<ICatPhoto[]> = this.store.select(fromCatSelectors.selectPhotos);

  /** Observable stream indicating the loading status */
  isLoading$: Observable<boolean> = this.store.select(fromCatSelectors.selectLoading);

  /** Subject used for unsubscribing from observables on component destruction */
  private destroy$ = new Subject<void>();

  /** Special filter constants for 'all' and 'none' selections */
  private readonly ALL = 'all';
  private readonly NONE = 'none';

  constructor (  
    private fb: FormBuilder,
    private store: Store<State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.catForm = this.fb.group({
      breeds: [[this.ALL]],
      limit: [10]
    });
  
    this.availableBreeds = this.route.snapshot.data['breeds'];
  
    this.loadInitialCats();
  
    // Handle form changes with a clean-up mechanism using takeUntil
    this.catForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.handleFormChanges(val);
    });
  }
  
  /**
   * Processes form value changes to apply breed filters for photo loading.
   * Sets breed IDs based on special filter selections and triggers the photo loading action.
   *
   * @param formValue The current value of the form.
   */
  handleFormChanges(formValue: ICatFormValues): void {
    const breeds = formValue.breeds as string[];
    
    let breedIds: string[] = breeds.includes(this.ALL) ? [] : breeds;
  
    if (breeds.includes(this.NONE)) {
      breedIds = [this.NONE];
      this.catForm.get('breeds')?.setValue([this.NONE], { emitEvent: false });
    } else if (breeds.includes(this.ALL)) {
      this.catForm.get('breeds')?.setValue([this.ALL], { emitEvent: false });
    }
    
    this.store.dispatch(loadPhotos({ breed: breedIds, limit: formValue.limit }));
  }

  /** Checks if 'all' breed filter is selected */
  isAllSelected(): boolean {
    return this.catForm.get('breeds')?.value.includes(this.ALL);
  }

  /** Checks if 'none' breed filter is selected */
  isNoneSelected(): boolean {
    return this.catForm.get('breeds')?.value.includes(this.NONE);
  }
  
  /** Checks if either 'all' or 'none' breed filter is selected */
  isAllOrNoneSelected(): boolean {
    return this.isAllSelected() || this.isNoneSelected();
  }

  /** Triggers the initial load of cat photos */
  loadInitialCats(): void {
    const limit = this.catForm.value.limit as number;
    this.store.dispatch(loadPhotos({ breed: [], limit }));
  }

  /** Clean up subscriptions when the component is destroyed */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
