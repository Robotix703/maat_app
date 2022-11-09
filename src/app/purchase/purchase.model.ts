/* eslint-disable @typescript-eslint/naming-convention */

export interface Purchase {
  _id: string;
  title: string;
  amount: number;
  date: Date;
  To: string[];
  from: string;
  listId: string;
  balance1: string;
  balance2: string;
}

export interface FetchedPurchases {
  listName: string;
  purchases: Purchase[];
}
