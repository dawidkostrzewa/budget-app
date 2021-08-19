import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectNumber } from './home-page.selectors';

@Injectable({
    providedIn: 'root'
})
export class HomePageFacade {
    constructor(private store: Store) {}

    number$: Observable<number> = this.store.select(selectNumber);
}
