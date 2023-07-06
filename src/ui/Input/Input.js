import classNames from "classnames";
import "./style.css";

const CustomInput = ({ action, empty, ...props }) => {
  const inputStyle = classNames("search-input", { empty: empty });

  return <input {...props} className={inputStyle} onInput={action} />;
};

export default CustomInput;
