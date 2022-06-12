import { request } from './axios.config';
import { omit } from 'lodash';

export const article = {
  async getArticle(id: number | string, userId: number): Promise<IArticle> {
    return request.get<IArticle>('/article/user/detail', {
      params: {
        article_id: id,
        user_id: userId,
      },
    });
  },
  async getArticleList({
    size,
    page,
    userId,
  }: {
    page: number;
    size: number;
    userId: number;
  }): Promise<ListResponse<IArticle>> {
    return request.get<ListResponse<IArticle>>('/article/user/list', {
      params: {
        page,
        size,
        user_id: userId,
      },
    });
  },
  async addArticle(data: {
    title: string;
    tag: number;
    content: string;
    picture: string;
    summary: string;
  }): Promise<IArticle> {
    return request.post<IArticle>('/article/user/create-article', {
      ...omit(data, 'tag'),
      category_id: 1,
      tags: [data.tag],
      secret: 1,
    });
  },
  async updateArticle(
    id: number,
    options: {
      title?: string;
      content?: string;
      picture?: string;
      summary?: string;
    }
  ): Promise<IArticle> {
    return request.post<IArticle>('/article/user/update-article', {
      ...options,
      article_id: id
    });
  },
  async deleteArticle(id: number): Promise<string> {
    return request.get('/article/user/delete', {
      params: {
        article_id: id,
      },
    });
  },
};

export interface ListResponse<T> {
  list: T[];
  count: number;
}

interface content {
  article_id: number;
  content: string;
}

export interface IArticle {
  article_id: number;
  user_id: number;
  category_id: number;
  tags: { tag_id: number; }[]; // 由于懒得写接口，这个接口是拿之前的，其实不需要数组
  picture: string;
  title: string;
  summary: string;
  secret: number;
  readcount: number;
  updated_at: number;
  created_at: number;
  level: number;
  content: content;
}
