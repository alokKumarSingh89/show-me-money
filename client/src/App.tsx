import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { loadReport } from "./api/helper";
import { Report } from "./interface/Report.interface";
import { Header } from "./components/Header";
import { Card } from "./components/Card";

function App() {
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    loadReport()
      .then((res) => {
        if (res.statusCode == 200) {
          setReport(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err: any) => {
        toast.error(err);
      });
  }, []);
  return (
    <div>
      <Header title="Show Me Money" />
      <div className="w-1/3 mx-auto mt-10">
        {report && <Card title={report.title} data={report.data} />}
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
