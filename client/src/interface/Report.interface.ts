interface IRepo {
  [key: string]: string;
}
export interface Report {
  title: string;
  data: [IRepo];
}
