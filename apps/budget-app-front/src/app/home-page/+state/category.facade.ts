import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category, MainCategory } from './category.model';
import { CategoriesSelectors } from './category.selectors';

@Injectable({ providedIn: 'root' })
export class CategoryFacade {
    constructor(private readonly store: Store) {}

    allCategories$: Observable<Category[]> = this.store.select(CategoriesSelectors.selectAllCategories);

    allMainCategories$: Observable<MainCategory[]> = this.store.select(CategoriesSelectors.selectAllMainCategories);
}
