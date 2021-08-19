import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOME_PAGE_FEATURE, IHomePageState } from './home-page.reducer';

const selectHomePageState = createFeatureSelector<IHomePageState>(HOME_PAGE_FEATURE);

export const selectNumber = createSelector(selectHomePageState, (state) => state.number);
