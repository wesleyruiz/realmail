import { IPage } from 'realmail-core';

export interface IEmailTemplate {
  content: IPage;
  subject: string;
  subTitle: string;
}
