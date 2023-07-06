import { useState } from "react";

export function usePagination(filteredData, pageSize) {
  const data = filteredData || [];

  const [currentPage, setCurrentPage] = useState(0);

  const totalItemsCount = data.length;

  let totalPages = Math.ceil(totalItemsCount / pageSize);

  const takeFrom = currentPage * pageSize;
  const takeTo = takeFrom + pageSize;
  const dataForRender = data.slice(takeFrom, takeTo);

  return {
    currentPage: currentPage + 1,
    setCurrentPage: (newPage) => setCurrentPage(newPage - 1),
    dataForRender,
    totalPages,
  };
}
