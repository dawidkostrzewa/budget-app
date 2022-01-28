import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategories from './category.reducer';

const selectCategoriesState = createFeatureSelector<fromCategories.ICategoriesState>(fromCategories.CATEGORIES_FEATURE);

const selectCategoriesEnities = createSelector(selectCategoriesState, fromCategories.selectors.selectEntities);

const selectCategoryById = (id: number) => createSelector(selectCategoriesEnities, (entities) => entities[id]);

const selectAllCategories = createSelector(selectCategoriesState, fromCategories.selectors.selectAll);

const selectAllMainCategories = createSelector(selectCategoriesState, (state) => state.mainCategories);

const selectSubCategoriesByMainCategoryId = (mainCategoryId: number) =>
    createSelector(selectAllCategories, (categories) =>
        categories.filter((category) => category.mainCategoryId === mainCategoryId)
    );

export const CategoriesSelectors = {
    selectCategoryById,
    selectAllCategories,
    selectAllMainCategories,
    selectSubCategoriesByMainCategoryId
};
