export interface Sort {
  field: string;
  asc: boolean;
}

export interface PageParam {
  page: number;
  size: number;
  sort?: string;
}
