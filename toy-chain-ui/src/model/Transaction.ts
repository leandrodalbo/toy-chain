export interface Transaction {
  hash?: string;
  blockHash?: string;
  sender: string;
  receiver: string;
  amount: number;
  timestamp?: string;
}
