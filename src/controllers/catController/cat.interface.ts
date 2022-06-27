export interface Cat {
  name: string;
  id: string;
  breed: string;
}

export type ReqCat = Omit<Cat, 'id'>;
