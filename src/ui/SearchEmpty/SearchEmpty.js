import "./style.css";

const SearchEmpty = ({ children }) => {
  return (
    <div className="board-empty-wrapper ">
      <div className="empty-board-text">{children}</div>
    </div>
  );
};

export default SearchEmpty;
