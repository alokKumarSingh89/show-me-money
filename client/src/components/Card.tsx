import { Report } from "../interface/Report.interface";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const Card = ({ title, data }: Report) => {
  if (!data.length) return <div>Don't Have Report</div>;
  const columnDefs: any = Object.keys(data[0]).map((key) => ({ field: key }));

  return (
    <div>
      <p>{title}</p>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 700 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={data} columnDefs={columnDefs} />
      </div>
    </div>
  );
};
