import React from 'react';

function ColumnTable({ columns }) {
  return (
    <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
      <thead>
        <tr>
          <th>Nummer</th>
          <th>Spaltenname</th>
        </tr>
      </thead>
      <tbody>
        {columns.map((col, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{col}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ColumnTable;