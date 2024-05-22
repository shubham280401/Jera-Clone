// CardModal.js
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoMdCheckbox } from "react-icons/io";
import { TbAlertSquareFilled } from "react-icons/tb";
import { BsLightningChargeFill } from "react-icons/bs";
import "./CardModal.css"; // Import close icon

// Import your Card component here
import { FaEquals } from "react-icons/fa";
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

const copyLinkToClipboard = (id) => {
  const link = `${window.location.origin}/card/${id}`;
  navigator.clipboard.writeText(link).then(() => {
    alert("Link copied to clipboard!");
  });
};

const CardModal = ({ isOpen, handleClose, card }) => {
  if (!isOpen || !card) return null;

  const { id, name, description, points, type, priority } = card;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="custom-modal">
        <div className="modal-header">
          <div className="header-left">
            <span className="modal-icon">{getTypeIcon(type)}</span>
            <h2 className="modal-id">{id}</h2>
          </div>

          <div className="header-right">
            <div>
              <button
                className="copy-button"
                onClick={() => copyLinkToClipboard(id)}
              >
                Copy Link
              </button>
            </div>
            <div onClick={handleClose}>&#10005;</div>
          </div>
        </div>
        <div className="modal-content">
          <div className="main-content">
            <div className="priority-icon">{getPriorityIcon(priority)}</div>
            <h1 className="modal-title">{name}</h1>
            <p className="modal-description">{description}</p>
            <p className="modal-points">Points: {points}</p>
            <p className="modal-type">Type: {type}</p>
          </div>
          <div className="details-content">
            <h3>Details</h3>
            <p>
              <strong>Points:</strong> {points}
            </p>
            <p>
              <strong>Priority:</strong> {priority}
            </p>
            {/* Add more details here as needed */}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CardModal;
