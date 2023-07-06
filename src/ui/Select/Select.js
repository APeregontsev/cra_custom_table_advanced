import "./style.css";

const CustomSelect = ({ action }) => {
  return (
    <select
      name="actions-select"
      className="actions-select"
      value="action"
      onChange={(e) => {
        const actionType = e.target.value;
        action(actionType);
      }}
    >
      <option value="action" disabled>
        Action
      </option>

      <option value="edit">Edit</option>
      <option value="delete">Delete</option>
    </select>
  );
};

export default CustomSelect;
