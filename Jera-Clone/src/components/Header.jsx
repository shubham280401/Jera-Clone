import "./Header.css";
import BasicModal from "./BasicModal";

const Header = ({ setIssues }) => {
  return (
    <header className="header">
      This is header
      <BasicModal className="modal-btn-create" setIssues={setIssues} />
      {console.log("Header received setIssues:", setIssues)}
    </header>
  );
};
export default Header;
