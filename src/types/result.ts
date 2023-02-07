export interface Result<T> {
  data: T;
  message: string;
  code: number;
}

export interface PageResult<T> {
  total: number;
  records: T[];
}

export interface SelectData {
  name: string;
  value: any;
  selected: boolean;
  disabled: boolean;
  type: string;
  attributes: any;
}
