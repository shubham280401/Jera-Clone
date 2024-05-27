import "./Header.css";
import BasicModal from "./BasicModal";

const Header = ({ setIssues }) => {
  return (
    <header className="header">
      Taskify
      <BasicModal className="modal-btn-create" setIssues={setIssues} />
      {console.log("Header received setIssues:", setIssues)}
    </header>
  );
};
export default Header;
