export interface Category {
    id: number;
    name: string;
    mainCategoryId: number;
}

export interface MainCategory {
    id: number;
    name: string;
}

export interface CategoryAmountSummary {
    category: Category | undefined;
    amount: number;
}
