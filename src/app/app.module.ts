import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppMaterialModule } from './app-material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { YearSummaryPageComponent } from './year-summary-page/year-summary-page.component';

@NgModule({
    declarations: [AppComponent, HeaderComponent, HomePageComponent, SidebarComponent, YearSummaryPageComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, AppMaterialModule],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
