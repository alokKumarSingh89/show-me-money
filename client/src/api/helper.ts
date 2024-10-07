export const loadReport = async () => {
  return fetch("http://localhost:4000/xero/reports").then((response) =>
    response.json()
  );
};
