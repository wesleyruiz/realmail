import axios from 'axios';
import { IUser } from '@demo/services/user';
const sessionKey = 'session-key';
const tokenKey = 'token-key';
export class UserStorage {
  static async getAccount(): Promise<IUser | null> {
    const token = window.localStorage.getItem(tokenKey);

    let account: IUser;
    if (token) {
      const sesseionAccout = window.sessionStorage.getItem(sessionKey);
      if (sesseionAccout) {
        return JSON.parse(sesseionAccout);
      } else {
        try {
          const { data } = await axios.get<IUser>('/realmail-api/user/user/info', {
            headers: {
              authorization: token,
            },
            baseURL: 'https://www.maocanhua.cn',
          });
          account = data;
          window.sessionStorage.setItem(sessionKey, JSON.stringify(account));
          window.localStorage.setItem(tokenKey, account.token);
          return account;
        } catch (error) {
          this.logout();

        }
      }
    }
    return null;
  }

  static async getToken() {
    const account = await this.getAccount();
    return account ? account.token : '';
  }

  static setToken(token: string) {
    window.localStorage.setItem(tokenKey, token);
  }

  static logout() {
    window.localStorage.setItem(tokenKey, '');
    window.sessionStorage.setItem(sessionKey, '');
    window.location.reload();
  }
}
