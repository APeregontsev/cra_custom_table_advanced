import "./style.css";
import classNames from "classnames";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  let pagesArray = getPagesArray(totalPages);

  function getPagesArray(totalPages) {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
      result.push(i + 1);
    }
    return result;
  }

  return (
    <div className="pagination-wrapper">
      {pagesArray.map((page) => (
        <div
          className={classNames("page_number", { active: currentPage === page })}
          onClick={() => setCurrentPage(page)}
          key={page}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
