type TRowType = 'Header' | 'Section';
interface Attribute {
  Value: string;
  Id: string;
}
interface Cell {
  Value: string;
  Attributes?: [Attribute];
}
export interface Row {
  RowType: TRowType;
  Cells: [Cell];
}
export interface RowType {
  RowType: TRowType;
  Title?: string;
  Rows?: [Row];
  Cells?: [Cell];
}
export interface Report {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportDate: string;
  ReportTitles: [string];
  Rows: [RowType];
}
