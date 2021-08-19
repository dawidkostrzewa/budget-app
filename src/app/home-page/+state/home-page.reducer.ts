import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { increment } from './home-page.actions';

export const HOME_PAGE_FEATURE = 'home-page';

export interface IHomePageState {
    number: number;
}

export const adapter: EntityAdapter<IHomePageState> = createEntityAdapter<IHomePageState>({
    selectId: (state: IHomePageState) => state.number
});

export const homePageInitialState: IHomePageState = adapter.getInitialState({
    number: 0
});

const reducer = createReducer(
    homePageInitialState,
    on(increment, (state) => {
        return {
            ...state,
            number: state.number + 1
        };
    })
);

export function homePageReducer(state: IHomePageState | undefined, action: Action): IHomePageState {
    return reducer(state, action);
}
