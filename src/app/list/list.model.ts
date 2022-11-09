export interface List {
  _id: string;
  name: string;
  main: boolean;
  balance1: number;
  balance2: number;
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
