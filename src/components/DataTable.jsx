import React from 'react';

function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table-auto border border-gray-400 border-collapse max-w-full">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="border border-gray-300 px-2 py-1 text-left whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (
                <td key={j} className="border border-gray-200 px-2 py-1 whitespace-nowrap">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
