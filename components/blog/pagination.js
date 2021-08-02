import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/blog/pagination.module.css';
import Pagination from "react-js-pagination";

// const useStyles = makeStyles((theme) => ({
//     .pagination
// }))

const Paging = () => {

  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
      className={styles}
    />
  );
};

export default Paging;
