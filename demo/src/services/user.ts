import { request } from './axios.config';

export const user = {
  login(provider_token: string) {
    return request.post<IUser>('/user/visitor/login', {
      provider_token
    });
  },
  getInfo() {
    return request.get<IUser>('/user/user/info', {

    });
  }
};

export interface IUser { user_id: number; nickname: string; email: string; phone: string; avatar: string; intro: string; domain: string; sex: number; rank: number; created_at: number; updated_at: number; last_login: number; deleted_at: number; concat: IConcat; theme: ITheme; token: string; } interface IConcat { user_id: number; email: string; github: string; zhihu: string; weibo: string; } interface ITheme { user_id: number; music: string; color: string; }
