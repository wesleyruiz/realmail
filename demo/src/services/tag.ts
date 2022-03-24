import { request } from './axios.config';

export const Tag = {
  getList(params: { page: number, size: number; }): Promise<ListResponse<Tag>> {
    return request.get('/tag/user/list', {
      params
    });
  }
};

export interface ListResponse<T> {
  list: T[];
  count: number;
}
export interface Tag {
  tag_id: number;
  name: string;
  picture: string;
  desc: string;
  created_at: number;
  updated_at: number;
  articlesCount?: number;
}
