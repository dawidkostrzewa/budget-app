import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategories from './category.reducer';

const selectCategoriesState = createFeatureSelector<fromCategories.ICategoriesState>(fromCategories.CATEGORIES_FEATURE);

const selectCategoriesEnities = createSelector(selectCategoriesState, fromCategories.selectors.selectEntities);

const selectCategoryById = (id: number) => createSelector(selectCategoriesEnities, (entities) => entities[id]);

const selectAllCategories = createSelector(selectCategoriesState, fromCategories.selectors.selectAll);

export const CategoriesSelectors = {
    selectCategoryById,
    selectAllCategories
};
