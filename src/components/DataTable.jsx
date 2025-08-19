import React from 'react';

function DataTable({ columns, rows }) {
  return (
    <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((col, j) => (
              <td key={j}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;