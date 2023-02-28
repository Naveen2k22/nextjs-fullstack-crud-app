import React, { useEffect } from "react";
import classes from './tableFooter.module.css'

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={classes.wrapper}>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${classes.buttonFooter} ${
            page === el ? classes.active : classes.inactive
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;