import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Transaction } from './home-page.model';
import { HomePageActions } from './home-page.actions';

export const HOME_PAGE_FEATURE = 'home-page';

export interface IHomePageState {
    number: number;
    transactions: Transaction[];
}

export const adapter: EntityAdapter<IHomePageState> = createEntityAdapter<IHomePageState>({
    selectId: (state: IHomePageState) => state.number
});

export const homePageInitialState: IHomePageState = adapter.getInitialState({
    number: 0,
    transactions: []
});

const reducer = createReducer(
    homePageInitialState,
    on(HomePageActions.increment, (state) => {
        return {
            ...state,
            number: state.number + 1
        };
    }),
    on(HomePageActions.loadTransactions, (state, { transactions }) => {
        return { ...state, transactions: transactions };
    })
);

export function homePageReducer(state: IHomePageState | undefined, action: Action): IHomePageState {
    return reducer(state, action);
}
