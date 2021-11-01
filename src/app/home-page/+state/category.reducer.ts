import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Category, MainCategory } from './category.model';
import { TransactionsActions } from './transactions.actions';

export const CATEGORIES_FEATURE = 'categories';

export interface ICategoriesState extends EntityState<Category> {
    mainCategories: MainCategory[];
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({});

export const selectors = adapter.getSelectors();

export const categoriesInitialState: ICategoriesState = adapter.getInitialState({
    mainCategories: []
});

const reducer = createReducer(
    categoriesInitialState,

    on(TransactionsActions.loadCategories, (state, { subCategories }) => {
        return adapter.upsertMany(subCategories, state);
    }),
    on(TransactionsActions.loadMainCategories, (state, { mainCategories }) => {
        return { ...state, mainCategories };
    })
);

export function categoriesReducer(state: ICategoriesState | undefined, action: Action): ICategoriesState {
    return reducer(state, action);
}
