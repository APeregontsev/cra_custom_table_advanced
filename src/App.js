import "./App.css";
import Table from "./components/Table/Table";
import Loading from "./ui/Loader/Loader";
import Header from "./components/Header/Header";
import Pagination from "./ui/PaginationBlock/PaginationBlock";
import SearchEmpty from "./ui/SearchEmpty/SearchEmpty";
import { useFetching } from "./useFetching";
import { useEffect, useReducer, useState } from "react";
import { useFilter } from "./useFilter";
import { usePagination } from "./usePagination";
import { reducer } from "./reducer";
import { offlineData } from "./offlineData";

function App() {
  const entriesPerPage = 20;
  const storageKey = "carsList";
  const [filter, setFilter] = useState({ searchQuery: "", sortingField: "id", ascending: true });

  console.log("----------FILTER", filter);
  const [fetchedData, dispatch] = useReducer(reducer, null);

  // Loading initial data for a table
  useEffect(() => {
    // On the initial loading of the component, we look for data stored in the same
    // session - perhaps we just reloaded the page, and the data still exists
    const sessionStorageData = JSON.parse(sessionStorage.getItem(storageKey));

    // If the data has not been saved, then we take it from the API
    if (!sessionStorageData) {
      fetchCars();
    } else {
      dispatch({ type: "SET_DATA", data: sessionStorageData });
    }
  }, []);

  // With each data update - saving it to the session
  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(fetchedData));
  }, [fetchedData]);

  // Loading data from the API
  const [fetchCars, isLoading, error] = useFetching(async () => {
    const response = await fetch("https://myfakeapi.com/api/cars/");

    // Offline data used in case test API is unavailable or broken
    if (!response.ok) return dispatch({ type: "SET_DATA", data: offlineData });

    const responseData = await response.json();
    dispatch({ type: "SET_DATA", data: responseData.cars });
  });

  //Data after applying search AND sorting
  const filteredData = useFilter(fetchedData, filter);

  console.log("filteredData", filteredData);

  const pagination = usePagination(filteredData, entriesPerPage);
  const hasRenderData = pagination.dataForRender && pagination.dataForRender.length > 0;

  // Setting the correct page number when changing pagination
  useEffect(() => {
    if (pagination.currentPage > pagination.totalPages || pagination.currentPage === pagination.totalPages) {
      pagination.setCurrentPage(pagination.totalPages);
    } else {
      pagination.setCurrentPage(1);
    }
  }, [filter, fetchedData]);

  const isSearchEmpty = filteredData ? !isLoading && !Boolean(filteredData.length) : false;

  return (
    <div className="wrapper">
      <Header filter={filter} setFilter={setFilter} dispatch={dispatch} />

      <div className="table-wrapper">
        {isLoading && <Loading />}

        {hasRenderData && (
          <>
            <Table
              data={pagination.dataForRender}
              dispatch={dispatch}
              filter={filter}
              setFilter={setFilter}
            />
            {pagination && (
              <Pagination
                totalPages={pagination.totalPages}
                currentPage={pagination.currentPage}
                setCurrentPage={pagination.setCurrentPage}
              />
            )}
          </>
        )}

        {isSearchEmpty && <SearchEmpty>Nothing found</SearchEmpty>}
      </div>
    </div>
  );
}

export default App;
