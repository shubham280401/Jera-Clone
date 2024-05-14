import {
  FcBiotech,
  FcTimeline,
  FcApproval,
  FcBinoculars,
  FcClock,
} from "react-icons/fc";
import "./Card.css";
const Card = ({ name, type, id, points, status }) => {
  let icon;
  switch (status) {
    case "To Do":
      icon = <FcTimeline />;
      break;
    case "In Progress":
      icon = <FcBiotech />;
      break;
    case "Paused":
      icon = <FcClock />;
      break;
    case "In Review":
      icon = <FcBinoculars />;
      break;
    case "Done":
      icon = <FcApproval />;
      break;
    default:
      icon = null;
      break;
  }
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h3>{name}</h3>
        </div>
        <div>{type}</div>
        <div>{status}</div>
      </div>

      <div className="card-footer">
        <div className="left-card-footer">
          <div>{icon}</div>
          <div>{id}</div>
        </div>
        <div>{points}</div>
      </div>
    </div>
  );
};

export default Card;
