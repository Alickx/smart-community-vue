interface Result<T> {
  data: T;
  message: string;
  code: number;
}

interface pageResultData<T> {
  total: number;
  records: T[];
}

interface selectData {
  name: string;
  value: any;
  selected: boolean;
  disabled: boolean;
  type: string;
  extendObj: any;
}
