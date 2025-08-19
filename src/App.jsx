import React, { useState } from 'react';
import Papa from 'papaparse';
import DataTable from './components/DataTable';
import ColumnTable from './components/ColumnTable';
import './index.css'; // ← wichtig für Tailwind

function App() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      preview: 20,
      complete: (results) => {
        setColumns(results.meta.fields || []);
        setRows(results.data);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      }
    });
  };

  return (
    <div className="p-6 font-sans">

      {/* Header Row */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CSV Preview App</h1>

        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <span>Check out our Academy & Coaching at:</span>
          <a
            href="https://learndataengineering.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="LDE-Logo.png"
              alt="LDE Logo"
              className="w-[300px] h-auto cursor-pointer"
            />
          </a>
        </div>
      </div>

      {/* Upload */}
      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-2" />

      {/* File name and loader */}
      {loading && (
        <svg
              className="animate-spin h-4 w-4 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}

      {/* Content */}
      {columns.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6">Example data</h2>
          <DataTable columns={columns} rows={rows} />

          <h2 className="text-xl font-semibold mt-6">Column overview</h2>
          <ColumnTable columns={columns} />
        </>
      )}
    </div>
  );
}

export default App;
