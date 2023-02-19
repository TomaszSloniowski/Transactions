export interface Transaction {
  id?: string;
  amount?: number;
  beneficiary?: string;
  account: string;
  address: string;
  date?: string;
  description: string;
}

export enum AlertType {
  success = "success",
  error = "error",
}
