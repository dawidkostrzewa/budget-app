import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@budgetapp/budget-ui/feature-main').then(
        (module) => module.BudgetUiFeatureMainModule
      ),
  },
  {
    path: 'year-summary',
    loadChildren: () =>
      import('@budgetapp/budget-ui/feature-year-summary-page').then(
        (module) => module.BudgetUiFeatureYearSummaryPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
