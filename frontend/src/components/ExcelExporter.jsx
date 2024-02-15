// src/components/ExcelExporter.js
import React from 'react';

const ExcelExporter = ({ posts, userId, onDownload }) => {
  return (
    <button className="download-excel-button" onClick={onDownload}>
      Download in Excel
    </button>
  );
};

export default ExcelExporter;
