import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppMaterialModule } from './app-material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { YearSummaryPageComponent } from './year-summary-page/year-summary-page.component';
import {
  transactionsReducer,
  TRANSTACTIONS_FEATURE,
} from './home-page/+state/Transactions/transactions.reducer';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { CategoryTransactionsComponent } from './home-page/category-transactions/category-transactions.component';
import {
  categoriesReducer,
  CATEGORIES_FEATURE,
} from './home-page/+state/Category/category.reducer';
import {
  expensesReducer,
  EXPENSES_FEATURE,
} from './home-page/+state/Expenses/expenses.reducer';

import { PricePipe } from './shared/price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    SidebarComponent,
    YearSummaryPageComponent,
    CategoryTransactionsComponent,
    PricePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    StoreModule.forRoot({
      [TRANSTACTIONS_FEATURE]: transactionsReducer,
      [CATEGORIES_FEATURE]: categoriesReducer,
      [EXPENSES_FEATURE]: expensesReducer,
    }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      name: 'BudgetApp',
      logOnly: environment.production,
    }),
    // StoreModule.forFeature(TRANSTACTIONS_FEATURE, transactionsReducer),
    EffectsModule.forFeature([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
