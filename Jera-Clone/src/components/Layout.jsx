import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Sidebar.css";

const Layout = ({ children, setIssues }) => {
  console.log("Name");
  return (
    <div>
      <Header setIssues={setIssues} />
      <Sidebar />
      <div className="card-components">{children}</div>
    </div>
  );
};

export default Layout;
