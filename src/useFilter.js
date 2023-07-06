import { useMemo } from "react";

/** SORTING */

export const useSorting = (data, sortingField, ascending) => {
  const sortedData = useMemo(() => {
    const direction = ascending ? 1 : -1;

    const sortString = (a, b) =>
      a[sortingField].toString().localeCompare(b[sortingField].toString()) * direction;

    const sortNumber = (a, b) => (a[sortingField] - b[sortingField]) * direction;

    if (sortingField && data) {
      const typeOfSortingField = typeof data[0][sortingField] === "number" ? "number" : "string";

      switch (typeOfSortingField) {
        case "number":
          return [...data].sort(sortNumber);

        case "string":
          return [...data].sort(sortString);

        default:
          return data;
      }
    }
    return data;
  }, [data, sortingField, ascending]);

  return sortedData;
};

/** SEARCH */

export const useFilter = (data, filter) => {
  const { searchQuery, sortingField, ascending } = filter;
  const sortedData = useSorting(data, sortingField, ascending);

  const filteredData = useMemo(() => {
    function searchCallback(car) {
      for (const key in car) {
        if (car[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) return true;
      }
    }

    if (searchQuery) {
      return sortedData.filter(searchCallback);
    } else {
      return sortedData;
    }
  }, [data, searchQuery, sortingField, ascending]);

  return filteredData;
};
