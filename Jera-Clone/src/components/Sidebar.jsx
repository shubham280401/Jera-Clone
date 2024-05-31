import { NavLink } from "react-router-dom";
import { TbStack2Filled } from "react-icons/tb";
import { RiArchiveStackLine } from "react-icons/ri";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink
            // style={{ display: "flex" }}
            to="/backlog"
            className={({ isActive }) =>
              isActive ? "active icon-placement" : "icon-placement"
            }
          >
            <RiArchiveStackLine />
            Backlog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/active-sprints"
            className={({ isActive }) =>
              isActive ? "active icon-placement" : "icon-placement"
            }
          >
            <TbStack2Filled />
            Active Sprints
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
