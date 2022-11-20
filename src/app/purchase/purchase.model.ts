/* eslint-disable @typescript-eslint/naming-convention */

export interface Purchase {
  _id: string;
  title: string;
  amount: number;
  date: Date;
  buyTo: string[];
  from: string;
  listId: string;
  total0: number;
  total1: number;
  balance0: number;
  balance1: number;
}

export interface FetchedPurchases {
  listName: string;
  purchases: Purchase[];
}

export interface FormPurchase {
  title: string;
  amount: number;
  buyTo: string[];
  from: string;
  listId: string;
}

export interface CreateResponse {
  status: string;
}
