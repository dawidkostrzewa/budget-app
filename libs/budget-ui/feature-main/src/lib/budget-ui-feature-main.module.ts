import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryTransactionsComponent } from './home-page/category-transactions/category-transactions.component';
import { RouterModule } from '@angular/router';
import {
  BudgetUiSharedModule,
  SharedMaterialModule,
} from '@budgetapp/budget-ui/shared';
import { ContentLoaderModule } from '@ngneat/content-loader';

const routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [HomePageComponent, CategoryTransactionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BudgetUiSharedModule,
    SharedMaterialModule,
    ContentLoaderModule,
  ],
})
export class BudgetUiFeatureMainModule {}
