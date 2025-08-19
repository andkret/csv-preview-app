import React, { useState } from 'react';

function JsonPreview({
  jsonObjects,
  setJsonObjects,
  currentIndex,
  setCurrentIndex,
  loading,
  setLoading,
  fileName,
  setFileName
}) {

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const slice = file.slice(0, 2 * 1024 * 1024); // Read first 2MB only

    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split('\n').filter(Boolean).slice(0, 20);
      const parsed = [];

      for (let line of lines) {
        try {
          parsed.push(JSON.parse(line));
        } catch (err) {
          parsed.push({ error: 'Invalid JSON', raw: line });
        }
      }

      setJsonObjects(parsed);
      setCurrentIndex(0);
      setLoading(false);
    };

    reader.readAsText(slice);
  };

  const showPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => Math.min(jsonObjects.length - 1, prev + 1));
  };

  return (
    <div>
      {/* Upload + Spinner */}
      <div className="flex items-center space-x-2 mb-4">
        <input type="file" accept=".json,.txt" onChange={handleFileUpload} />
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

      {/* JSON display + navigation */}
      {jsonObjects.length > 0 && (
        <div className="border border-gray-300 rounded p-4 bg-gray-50 relative">
          {/* Top bar */}
          <div className="flex items-center space-x-2 text-sm mb-2 text-gray-600">
            <span>{currentIndex + 1} / {jsonObjects.length}</span>
            <button
              onClick={showPrevious}
              disabled={currentIndex === 0}
              className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-200 disabled:opacity-30"
            >
              ←
            </button>
            <span>previous / next</span>
            <button
              onClick={showNext}
              disabled={currentIndex === jsonObjects.length - 1}
              className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-200 disabled:opacity-30"
            >
              →
            </button>
          </div>


          {/* JSON Viewer */}
          <pre className="overflow-auto text-sm text-gray-800 bg-white border border-gray-200 p-3 rounded max-h-[500px] whitespace-pre-wrap">
            {JSON.stringify(jsonObjects[currentIndex], null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default JsonPreview;
