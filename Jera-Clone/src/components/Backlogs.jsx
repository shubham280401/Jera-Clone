import "./Backlogs.css";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoMdCheckbox } from "react-icons/io";
import { TbAlertSquareFilled } from "react-icons/tb";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";
const getTypeIcon = (type) => {
  switch (type) {
    case "Story":
      return <BsFillBookmarkStarFill color="green" />;
    case "Chore":
      return <IoMdCheckbox color="#4db8ff" />;
    case "Bug":
      return <TbAlertSquareFilled color="#ff3300" />;
    case "Epic":
      return <BsLightningChargeFill color="#8f00b3" />;

    default:
      return null;
  }
};

const getPriorityIcon = (priority) => {
  switch (priority) {
    case "Normal":
      return <FaEquals color="green" />;
    case "Critical":
      return <MdOutlineKeyboardDoubleArrowUp color="red" />;
    case "High":
      return <MdOutlineKeyboardArrowUp color="orange" />;
    case "Low":
      return <MdKeyboardDoubleArrowDown color="blue" />;
    default:
      return null;
  }
};
const Backlogs = ({ issues }) => {
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    navigate(`/card/${id}`);
  };
  return (
    <div className="backlogs">
      <h2>Backlogs</h2>
      <div className="backlog-list">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="backlog-item"
            onClick={() => handleItemClick(issue.id)}
          >
            <div className="backlog-item-header">
              <div className="backlog-item-id-icon">
                <span className="backlog-item-icon">
                  {getTypeIcon(issue.type)}
                </span>
                <span className="backlog-item-id">{issue.id}</span>
              </div>
              <div className="backlog-item-points-priority">
                <span className="backlog-item-points">{issue.points}</span>
                <span className="backlog-item-priority">
                  {getPriorityIcon(issue.priority)}
                </span>
              </div>
            </div>
            <div className="backlog-item-title">{issue.name}</div>
            <div className="backlog-item-details">
              <span className="backlog-item-type">{issue.type}</span>
              <span className="backlog-item-status">{issue.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backlogs;
