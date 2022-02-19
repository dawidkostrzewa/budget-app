import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { SettingsActions } from '../../../../../../apps/budget-ui/src/app/settings/settings.actions';
import { ApiService } from '../api/api.service';
import { BudgetActions } from './budget.actions';

@Injectable()
export class BudgetEffects {
  constructor(
    private readonly actions: Actions,
    private readonly apiService: ApiService
  ) {}

  loadBudget = createEffect(
    () => () =>
      this.actions.pipe(
        ofType(SettingsActions.init),
        switchMap(() => this.apiService.fetchBudget()),
        map((budget) => BudgetActions.bugdetRecived(budget))
      )
  );
}
