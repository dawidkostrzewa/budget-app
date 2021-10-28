export interface Transaction {
    id: number;
    amount: number;
    categoryId: number;
    date: string;
}

export interface TransactionWithCategoryName extends Omit<Transaction, 'categoryId' | 'date'> {
    categoryName: string;
    date: number;
}
