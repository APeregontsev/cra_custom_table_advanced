import "./style.css";
import classNames from "classnames";

function PageButton(props) {
  const { active, onClick, children } = props;

  return (
    <div className={classNames("page_number", { active })} onClick={onClick}>
      {children}
    </div>
  );
}

function range(startAt = 0) {
  return [...Array(siblingsRange).keys()].map((i) => i + startAt);
}

function SiblingPages(props) {
  const { startAt, onClick, totalPages } = props;

  return range(startAt)
    .filter((page) => page >= 1 && page <= totalPages)
    .map((page) => (
      <PageButton onClick={() => onClick(page)} key={page}>
        {page}
      </PageButton>
    ));
}

const siblingsRange = 5;

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const allowPrev = currentPage > 1;
  const allowNext = currentPage < totalPages;

  const firstPage = 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const lastPage = totalPages;

  return (
    <div className="pagination-wrapper">
      {allowPrev && <PageButton onClick={() => setCurrentPage(firstPage)}>{"<<"}</PageButton>}
      {allowPrev && <PageButton onClick={() => setCurrentPage(prevPage)}>{"<"}</PageButton>}
      <SiblingPages
        startAt={currentPage - siblingsRange}
        onClick={(page) => setCurrentPage(page)}
        totalPages={totalPages}
      />
      <PageButton onClick={() => setCurrentPage(currentPage)} active>
        {currentPage}
      </PageButton>
      <SiblingPages startAt={nextPage} onClick={(page) => setCurrentPage(page)} totalPages={totalPages} />
      {allowNext && <PageButton onClick={() => setCurrentPage(nextPage)}>{">"}</PageButton>}
      {allowNext && <PageButton onClick={() => setCurrentPage(lastPage)}>{">>"}</PageButton>}
    </div>
  );
};

export default Pagination;

/* import "./style.css";
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
 */
