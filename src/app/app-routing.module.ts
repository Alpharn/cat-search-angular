import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { breedResolver } from './resolvers/breed.resolver';
import { CatFilterComponent } from './cat-filter/cat-filter.component';

const routes: Routes = [
  {
    path: '',
    component: CatFilterComponent,
    resolve: { breeds: breedResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
