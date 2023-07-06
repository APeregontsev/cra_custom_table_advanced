import "./style.css";

const ConfirmPlate = ({ actionCancel, actionConfirm }) => {
  return (
    <div className="modal-content">
      <div className="add-task-title red">Сonfirm deletion</div>

      <div className="inner-task-description">Are you sure you want to delete this car?</div>

      <div className="buttons-wrapper">
        <button className="main-btn delete" onClick={() => actionConfirm()}>
          Delete
        </button>
        <button className="main-btn cancel" onClick={() => actionCancel(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmPlate;
