import React from 'react';
import { usePagination, DOTS } from './usePagination';
import arrow from './images/arrow-pagination.svg';
import styles from './pagination.module.css';


export function Pagination(props) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={styles.pagination_container}    >
      <li
        className={currentPage === 1 ? `${styles.disabled}  ${styles.pagination_item}` : `${styles.pagination_item}`}
        onClick={onPrevious}      >
        <div className={`  ${styles.left}`} >
          <img src={arrow} alt="arrow" />
        </div>
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className={`${styles.dots}  ${styles.pagination_item}`}>&#8230;</li>;
        }
        return (
          <li
            className={pageNumber === currentPage ? `${styles.selected}  ${styles.pagination_item}` : `${styles.pagination_item}`}
            onClick={() => onPageChange(pageNumber)}          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={currentPage === lastPage ? `${styles.disabled}  ${styles.pagination_item}` : `${styles.pagination_item}`}
        onClick={onNext}      >
        <div className={` ${styles.right} `} >
          <img src={arrow} alt="arrow" />
        </div>
      </li>
    </ul>
  );
};

export default Pagination;