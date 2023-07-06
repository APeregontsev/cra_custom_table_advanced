import "./style.css";
import { useState } from "react";
import Select from "../../ui/Select/Select";
import ModalWindow from "../../ui/ModalWindow/ModalWindow";
import ConfirmPlate from "../../ui/ConfirmPlate/ConfirmPlate";
import EditBlock from "../EditBlock/EditBlock";
import classNames from "classnames";
import MarkedString from "../MarkedString/MarkedString";

const Table = ({ data, dispatch, filter, setFilter }) => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  function confirmDeteting() {
    dispatch({ type: "DELETE_CAR", id: currentEntry.id });
    setShowModalConfirm(false);
  }

  const keysMatching = {
    id: "id",
    Company: "car",
    Model: "car_model",
    VIN: "car_vin",
    Color: "car_color",
    Year: "car_model_year",
    Price: "price",
    Availability: "availability",
  };

  const tableHead = ["id", "Company", "Model", "VIN", "Color", "Year", "Price", "Availability", "Actions"];

  function cellTitleClick(e) {
    if (filter.sortingField === keysMatching[e]) {
      setFilter({ ...filter, ascending: !filter.ascending });
    } else {
      setFilter({ ...filter, sortingField: keysMatching[e], ascending: true });
    }
  }

  return (
    <>
      <table>
        <thead>
          {tableHead.map((columnName) => {
            const cellTitleStyle = classNames(
              "cell-wrapper",
              {
                active: keysMatching[columnName] === filter.sortingField,
              },
              { desc: !filter.ascending }
            );

            return (
              <th>
                <div
                  className={cellTitleStyle}
                  onClick={(e) => {
                    if (columnName !== "Actions") cellTitleClick(columnName);
                  }}
                >
                  <div className="table-title">{columnName}</div>
                  <div className="sorting-mark"></div>
                </div>
              </th>
            );
          })}
        </thead>

        <tbody>
          {data.map((entry) => {
            return (
              <tr key={entry.id}>
                <td className="cell-center">
                  <MarkedString dataToMark={entry.id} searchData={filter.searchQuery} />
                </td>
                <td>
                  <MarkedString dataToMark={entry.car} searchData={filter.searchQuery} />
                </td>
                <td>
                  <MarkedString dataToMark={entry.car_model} searchData={filter.searchQuery} />
                </td>
                <td>
                  <MarkedString dataToMark={entry.car_vin} searchData={filter.searchQuery} />
                </td>
                <td>
                  <MarkedString dataToMark={entry.car_color} searchData={filter.searchQuery} />
                </td>
                <td>
                  <MarkedString dataToMark={entry.car_model_year} searchData={filter.searchQuery} />
                </td>
                <td className="cell-right">
                  <MarkedString dataToMark={entry.price} searchData={filter.searchQuery} />
                </td>

                <td className="cell-center">{entry.availability && <span>&#x2705;</span>}</td>
                <td>
                  <Select
                    action={(actionType) => {
                      setCurrentEntry(entry);

                      if (actionType === "delete") {
                        setShowModalConfirm(true);
                      } else {
                        setShowModalEdit(true);
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModalConfirm && (
        <ModalWindow action={setShowModalConfirm}>
          <ConfirmPlate actionCancel={setShowModalConfirm} actionConfirm={confirmDeteting} />
        </ModalWindow>
      )}

      {showModalEdit && (
        <ModalWindow action={setShowModalEdit}>
          <EditBlock
            modalCancel={setShowModalEdit}
            currentEntry={currentEntry}
            type="edit"
            dispatch={dispatch}
          >
            Edit car
          </EditBlock>
        </ModalWindow>
      )}
    </>
  );
};

export default Table;
