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
  category: string;
  amount: number;
}
