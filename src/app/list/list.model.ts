import { PrettyUser } from '../auth/user.model';

export interface List {
  _id: string;
  name: string;
  main: boolean;
  total0: number;
  total1: number;
  balance0: number;
  balance1: number;
  merged: boolean;
}

export interface DisplayableList {
  _id: string;
  name: string;
  main: boolean;
  total: number;
  balance: number;
  merged: boolean;
}

export interface PrettyList {
  _id: string;
  name: string;
  main: boolean;
  user0: PrettyUser;
  user1: PrettyUser;
  total0: number;
  total1: number;
  balance0: number;
  balance1: number;
  merged: boolean;
}

export interface FetchList {
  lists: List[];
  count: number;
}

export interface DeleteResponse {
  acknowledged: boolean;
  deletedCount: number;
}

export interface FormCreateList {
  listName: string;
  isMain: boolean;
}

export interface CreateResponse {
  id: string;
  list: List;
}
