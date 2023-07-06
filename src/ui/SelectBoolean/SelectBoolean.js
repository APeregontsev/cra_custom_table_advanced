import "./style.css";
import { useEffect, useState } from "react";
import classNames from "classnames";

const CustomSelectBoolean = ({ action, options, selected, empty }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [value, setValue] = useState("action");

  useEffect(() => {
    setValue(selected);
  }, []);

  const selectStyle = classNames("actions-select-boolean", { empty: empty });

  return (
    <select
      name="actions-select"
      value={value}
      className={selectStyle}
      onChange={(e) => {
        const actionType = e.target.value;
        setValue(actionType);
        action(actionType);
      }}
    >
      <option value="" disabled>
        Choose
      </option>

      {options.map((opt) => {
        return (
          <option key={opt} value={opt}>
            {capitalizeFirstLetter(opt)}
          </option>
        );
      })}
    </select>
  );
};

export default CustomSelectBoolean;
