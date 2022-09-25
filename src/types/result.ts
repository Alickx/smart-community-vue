interface Result<T> {
  data: T;
  message: string;
  code: number;
}

interface pageResultData<T> {
  total: number;
  records: T[];
}
