import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoMdCheckbox } from "react-icons/io";
import { TbAlertSquareFilled } from "react-icons/tb";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";
import "./Card.css";
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
const Card = ({
  name,
  type,
  id,
  points,
  status,
  priority,
  onClick = () => {},
}) => {
  const icon = getTypeIcon(type);
  const priorityIcon = getPriorityIcon(priority);

  return (
    <div className="card" onClick={onClick}>
      <div className="card-head">
        <div>
          <h3>{name}</h3>
        </div>
        <div>{status}</div>
        <div>{type}</div>
      </div>

      <div className="card-footer">
        <div className="left-card-footer">
          <div>{icon}</div>
          <div>{id}</div>
        </div>
        <div className="point-priority">
          <div>{points}</div>
          <div>{priorityIcon}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
