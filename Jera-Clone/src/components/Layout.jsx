import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Sidebar.css";

const Layout = ({ children }) => {
  console.log("Name");
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="card-components">{children}</div>
    </div>
  );
};

export default Layout;
