export interface BudgetResponse {
  budget: Budget[];
}

export interface Budget {
  month: string;
  totalPlanned: number;
  totalReal: number;
  totalIncome: number;
  expenses: BudgetCategory[];
}

export interface BudgetCategory {
  mainCategory: SingleCategory;
  subCategories: SingleCategory[];
}

export interface SingleCategory {
  name: string;
  planned: number;
  real: number;
}
