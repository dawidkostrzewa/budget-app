import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Category } from './category.model';
import { TransactionsActions } from './transactions.actions';

export const CATEGORIES_FEATURE = 'categories';

export interface ICategoriesState extends EntityState<Category> {}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({});

export const selectors = adapter.getSelectors();

export const categoriesInitialState = adapter.getInitialState({});

const reducer = createReducer(
    categoriesInitialState,

    on(TransactionsActions.loadCategories, (state, { categories }) => {
        return adapter.upsertMany(categories, state);
    })
);

export function categoriesReducer(state: ICategoriesState | undefined, action: Action): ICategoriesState {
    return reducer(state, action);
}
