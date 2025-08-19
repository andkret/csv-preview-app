import React, { useState } from 'react';
import Papa from 'papaparse';
import DataTable from './components/DataTable';
import ColumnTable from './components/ColumnTable';
import JsonPreview from './components/JsonPreview';
import './index.css'; // ← wichtig für Tailwind


function App() {
  const [activeTab, setActiveTab] = useState('csv');

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const [jsonObjects, setJsonObjects] = useState([]);
  const [currentJsonIndex, setCurrentJsonIndex] = useState(0);
  const [jsonLoading, setJsonLoading] = useState(false);
  const [jsonFileName, setJsonFileName] = useState('');


  const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setFileName(file.name);
      setLoading(true);

      // Read only the first 2MB of the file
      const slice = file.slice(0, 2 * 1024 * 1024);

      Papa.parse(slice, {
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

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CSV & JSON Preview App</h1>
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

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab('csv')}
          className={`px-4 py-2 mr-2 rounded-t ${activeTab === 'csv' ? 'bg-white border border-b-0' : 'bg-gray-100 text-gray-600'}`}
        >
          CSV Preview
        </button>
        <button
          onClick={() => setActiveTab('json')}
          className={`px-4 py-2 rounded-t ${activeTab === 'json' ? 'bg-white border border-b-0' : 'bg-gray-100 text-gray-600'}`}
        >
          JSON Preview
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white border p-4 rounded-b shadow-sm">
        {activeTab === 'csv' && (
          <>
            {/* Upload input + spinner in one line */}
            <div className="flex items-center space-x-2 mb-4">
              <input type="file" accept=".csv" onChange={handleFileUpload} />
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
            </div>

            {/* CSV Preview Content */}
            {columns.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-6">Example data</h2>
                <DataTable columns={columns} rows={rows} />

                <h2 className="text-xl font-semibold mt-6">Column overview</h2>
                <ColumnTable columns={columns} />
              </>
            )}
          </>
        )}

        {activeTab === 'json' && (
          <JsonPreview
            jsonObjects={jsonObjects}
            setJsonObjects={setJsonObjects}
            currentIndex={currentJsonIndex}
            setCurrentIndex={setCurrentJsonIndex}
            loading={jsonLoading}
            setLoading={setJsonLoading}
            fileName={jsonFileName}
            setFileName={setJsonFileName}
          />
        )}
      </div>
    </div>
  );
}

export default App;
