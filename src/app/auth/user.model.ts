/* eslint-disable id-blacklist */
/* eslint-disable no-underscore-dangle */
export class User {
  constructor(
    public name: string,
    public number: number
  ) {}
}

export interface PrettyUser {
  userName: string;
  userNumber: number;
  userId: string;
}
