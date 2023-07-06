import "./style.css";

const ModalWindow = ({ children, action }) => {
  return (
    <div className="modal-wrapper" onClick={() => action(false)}>
      <div className="inner-modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
