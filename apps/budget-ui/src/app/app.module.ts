import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { BudgetUiDataAccessModule } from '@budgetapp/budget-ui/data-access';
import { BudgetUiFeatureMainModule } from '@budgetapp/budget-ui/feature-main';
import { BudgetUiFeatureSidebarModule } from 'libs/budget-ui/feature-sidebar/src';
import { SharedMaterialModule } from '@budgetapp/budget-ui/shared';
import { BudgetUiFeatureHeaderModule } from '@budgetapp/budget-ui/feature-header';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BudgetUiDataAccessModule,
    BudgetUiFeatureMainModule,
    BudgetUiFeatureSidebarModule,
    BudgetUiFeatureHeaderModule,
    SharedMaterialModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      name: 'BudgetApp',
      logOnly: environment.production,
    }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
