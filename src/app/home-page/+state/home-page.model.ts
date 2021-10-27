export interface Transaction {
    id: number;
    amount: number;
    categoryId: number;
}

export interface Category {
    id: number;
    name: string;
    //TODO: subCategories typ
    subCategories: string[];
}

export interface TransactionWithCategoryName extends Omit<Transaction, 'categoryId'> {
    categoryName: string;
}
