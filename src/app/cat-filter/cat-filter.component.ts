import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

import { State } from 'src/app/store/reducers/cat.reducer';
import { loadPhotos } from 'src/app/store/actions/cat.actions';
import * as fromCatSelectors from 'src/app/store/selectors/cat.selectors';
import { ICatBreed, ICatPhoto } from '../interfaces/cat.interface';

@Component({
  selector: 'app-cat-filter',
  templateUrl: './cat-filter.component.html',
  styleUrls: ['./cat-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CatFilterComponent implements OnInit  {

  catForm!: FormGroup;
  availableBreeds: ICatBreed[] = [];
  limits: number[] = [5, 10, 15, 25, 50, 100];
  photos$: Observable<ICatPhoto[]> = this.store.select(fromCatSelectors.selectPhotos);
  isLoading$: Observable<boolean> = this.store.select(fromCatSelectors.selectLoading);
  private destroy$ = new Subject<void>();

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
  
    this.catForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.handleFormChanges(val);
    });
  }
  
  handleFormChanges(formValue: any): void {
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

  isAllSelected(): boolean {
    return this.catForm.get('breeds')?.value.includes(this.ALL);
  }
  
  isNoneSelected(): boolean {
    return this.catForm.get('breeds')?.value.includes(this.NONE);
  }
  
  isAllOrNoneSelected(): boolean {
    return this.isAllSelected() || this.isNoneSelected();
  }

  loadInitialCats(): void {
    const limit = this.catForm.value.limit as number;
    this.store.dispatch(loadPhotos({ breed: [], limit }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
