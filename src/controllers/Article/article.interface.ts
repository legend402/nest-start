import { PageType } from 'src/types/common';

export type ArticleListType = PageType & {
  title: string;
  content: string;
};
