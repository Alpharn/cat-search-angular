import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatFilterComponent } from './cat-filter/cat-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CatApiInterceptor } from './interceptors/cat-api.interceptor';
import { reducer as catReducer, catFeatureKey } from './store/reducers/cat.reducer';
import { CatEffects } from './store/effects/cat.effects';
import { CatApiService } from './cat-filter/services/cat-api.service'

@NgModule({
  declarations: [
    AppComponent,
    CatFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({[catFeatureKey]: catReducer}, {}),
    EffectsModule.forRoot([CatEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    CatApiService,
    { provide: HTTP_INTERCEPTORS, useClass: CatApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
