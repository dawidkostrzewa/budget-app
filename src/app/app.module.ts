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
import { transactionsReducer, HOME_PAGE_FEATURE } from './home-page/+state/transactions.reducer';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { HomePageEffects } from './home-page/+state/home-page.effects';

@NgModule({
    declarations: [AppComponent, HeaderComponent, HomePageComponent, SidebarComponent, YearSummaryPageComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            name: 'BudgetApp',
            logOnly: environment.production
        }),
        StoreModule.forFeature(HOME_PAGE_FEATURE, transactionsReducer),
        EffectsModule.forFeature([HomePageEffects])
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
