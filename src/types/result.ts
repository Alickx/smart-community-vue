interface Result<T> {
  data: T;
  message: string;
  code: number;
}

interface PageResult<T> {
  total: number;
  records: T[];
}

interface SelectData {
  name: string;
  value: any;
  selected: boolean;
  disabled: boolean;
  type: string;
  attributes: any;
}
