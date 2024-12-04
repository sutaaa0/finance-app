export interface Transaction {
    amount: number;
    category: string;
    date: string;
    notes?: string;
    type: string;
    userId: string;
}