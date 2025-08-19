import React, { useState } from 'react';
import Papa from 'papaparse';
import DataTable from './components/DataTable';
import ColumnTable from './components/ColumnTable';

function App() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      preview: 20,
      complete: (results) => {
        setColumns(results.meta.fields || []);
        setRows(results.data);
      }
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CSV Preview App</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {columns.length > 0 && (
        <>
          <h2>Example data</h2>
          <DataTable columns={columns} rows={rows} />
          <h2>Column overview</h2>
          <ColumnTable columns={columns} />
        </>
      )}
    </div>
  );
}

export default App;