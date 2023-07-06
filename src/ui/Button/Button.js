import "./style.css";
import classNames from "classnames";

const Button = ({ children, action, disabled, type }) => {
  const buttonStyle = classNames(
    "main-btn",
    { add: type === "add" },
    { clear: type === "clear" },
    { delete: type === "delete" },
    { cancel: type === "cancel" }
  );

  return (
    <button className={buttonStyle} onClick={action} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
