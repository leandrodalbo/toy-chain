import { Transaction } from "./Transaction";

export interface Block {
  hash: string;
  previousHash: string;
  timestamp: string;
  transactions?: Transaction[];
}
