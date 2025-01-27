import React from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}


const ItemPagination: 
React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page) => (
        <Link key={page}
         to={`/items?page=${page}`}
          className={page === currentPage ? 'active' : ''}>
          {page}
        </Link>
      ))}
    </div>
  );
};

export default ItemPagination;
