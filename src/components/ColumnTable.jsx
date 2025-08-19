import React from 'react';

function ColumnTable({ columns }) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table-auto border border-gray-400 border-collapse max-w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1 text-left whitespace-nowrap">Number</th>
            <th className="border border-gray-300 px-2 py-1 text-left whitespace-nowrap">Column Name</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((col, index) => (
            <tr key={index}>
              <td className="border border-gray-200 px-2 py-1 whitespace-nowrap">{index + 1}</td>
              <td className="border border-gray-200 px-2 py-1 whitespace-nowrap">{col}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ColumnTable;
