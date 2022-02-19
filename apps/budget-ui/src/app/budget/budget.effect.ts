import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { SettingsActions } from '../settings/settings.actions';
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
