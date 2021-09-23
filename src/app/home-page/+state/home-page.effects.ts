import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Injectable()
export class HomePageEffects {
    constructor(private actions: Actions) {}

    // testEffect = createEffect(
    //     () => () =>
    //         this.actions.pipe(
    //             ofType(HomePageActions.loadTransactions),
    //             map((v) => {
    //                 console.log(v);
    //                 return v.transactions[0];
    //             })
    //         )
    // );
}
