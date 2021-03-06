import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BudgetEffects } from './budget/budget.effect';
import { budgetReducer, BUDGET_FEATURE } from './budget/budget.reducer';
import { ApiService } from './api/api.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(BUDGET_FEATURE, budgetReducer),
    EffectsModule.forFeature([BudgetEffects]),
  ],
  providers: [BudgetEffects, ApiService],
})
export class BudgetUiDataAccessModule {}
