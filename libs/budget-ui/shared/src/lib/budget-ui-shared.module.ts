import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePipe } from './pricePipe/price.pipe';
import { MonthToNamePipe } from './monthToNamePipe/month-to-name.pipe';
import { TableContentLoaderComponent } from './table-content-loader/table-content-loader.component';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [PricePipe, MonthToNamePipe, TableContentLoaderComponent],
  imports: [CommonModule, ContentLoaderModule],
  exports: [PricePipe, MonthToNamePipe, TableContentLoaderComponent],
})
export class BudgetUiSharedModule {}
