/* eslint-disable id-blacklist */
/* eslint-disable no-underscore-dangle */
export class User {
  constructor(
    public id: string,
    public name: string,
    public number: number,
    private _token: string,
    private tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }

  get tokenDuration() {
    if (!this.token) { return 0; }
    return this.tokenExpirationDate.getTime() - new Date().getTime();
  }
}

export interface PrettyUser {
  name: string;
  id: string;
  number: number;
}
