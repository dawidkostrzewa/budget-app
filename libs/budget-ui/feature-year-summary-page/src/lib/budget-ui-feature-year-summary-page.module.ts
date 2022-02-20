import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearSummaryPageComponent } from './year-summary-page/year-summary-page.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    pathMatch: 'full',
    component: YearSummaryPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [YearSummaryPageComponent],
})
export class BudgetUiFeatureYearSummaryPageModule {}
