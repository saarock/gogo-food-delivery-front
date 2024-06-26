import React, { useState } from 'react';
import './pagination.css';

const GoGoPiginationsComponent = ({ totalPages, currentPage, onPageChange }:any) => {
  const handlePageClick = (pageNumber:any) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`gogo-page-item ${currentPage === i ? 'gogo-active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="gogo-pagination-container">
      <ul className="gogo-pagination">
        <li
          className={`gogo-page-item ${currentPage === 1 ? 'gogo-disabled' : ''}`}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Previous
        </li>
        {renderPageNumbers()}
        <li
          className={`gogo-page-item ${currentPage === totalPages ? 'gogo-disabled' : ''}`}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default GoGoPiginationsComponent;
