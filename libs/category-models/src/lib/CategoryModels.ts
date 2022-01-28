export interface SingleCategory {
  name: string;
  planned: number;
  real: number;
}

export interface BudgetCategory {
  mainCategory: SingleCategory;
  subCategories: SingleCategory[];
}

export interface MonthExpesesResponse {
  month: string;
  totalPlanned: number;
  totalReal: number;
  expenses: BudgetCategory[];
}
