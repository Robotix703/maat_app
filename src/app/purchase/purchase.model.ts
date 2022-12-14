/* eslint-disable @typescript-eslint/naming-convention */

import { PrettyUser } from '../auth/user.model';
import { List } from '../list/list.model';

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

export interface PrettyPurchase {
  _id: string;
  title: string;
  list: List;
  amount: number;
  date: Date;
  buyTo: string[];
  from: string;
  user0: PrettyUser;
  user1: PrettyUser;
  total0: number;
  total1: number;
  balance0: number;
  balance1: number;
}

export type UserId = string;

export interface FormPurchase {
  title: string;
  amount: number;
  buyTo: UserId[];
  from: UserId;
  listId: string;
}

export interface UpdateFormPurchase {
  title: string;
  amount: number;
  buyTo: UserId[];
  from: UserId;
}

export interface CreateResponse {
  status: string;
}

export interface UpdateResponse {
  status: string;
}
