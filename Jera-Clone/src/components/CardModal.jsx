import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoMdCheckbox } from "react-icons/io";
import { TbAlertSquareFilled } from "react-icons/tb";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardArrowUp,
  MdKeyboardDoubleArrowDown,
  MdExpandMore,
} from "react-icons/md";
import "./CardModal.css";

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

const CardModal = ({ isOpen, handleClose, card, updateCard }) => {
  const [showBranchInput, setShowBranchInput] = useState(false);
  const [showCommitInput, setShowCommitInput] = useState(false);
  const [cardData, setCardData] = useState({ ...card });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setCardData({ ...card });
  }, [card]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleUpdate = () => {
    updateCard(cardData);
    setHasChanges(false);
    handleClose();
  };

  if (!isOpen || !card) return null;

  const { id, name, description, points, type, priority } = cardData;

  const handleBranchClick = () => {
    setShowBranchInput(!showBranchInput);
  };

  const handleCommitClick = () => {
    setShowCommitInput(!showCommitInput);
  };

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
            <button
              className="copy-button"
              onClick={() => copyLinkToClipboard(id)}
            >
              Copy Link
            </button>
            <div onClick={handleClose}>&#10005;</div>
          </div>
        </div>
        <div className="modal-content">
          <div className="main-content">
            <div className="priority-icon">{getPriorityIcon(priority)}</div>
            <input
              type="text"
              name="name"
              className="modal-title-input"
              value={name}
              onChange={handleInputChange}
              style={{ fontWeight: "bold" }}
            />
            <textarea
              name="description"
              className="modal-description-input"
              value={description}
              onChange={handleInputChange}
              style={{ backgroundColor: "#f0f0f0" }}
            />
            <div className="point-container">
              <label htmlFor="points">Points: </label>
              <input
                type="number"
                name="points"
                className="modal-points-input"
                value={points}
                onChange={handleInputChange}
              />
            </div>

            <div className="point-container">
              <label htmlFor="type">Type: </label>
              <input
                type="text"
                name="type"
                className="modal-type-input"
                value={type}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="details-content">
            <h3>Details</h3>
            <p>
              <strong>Points:</strong> {points}
            </p>
            <p>
              <strong>Priority:</strong> {priority}
            </p>
            <div className="git-branch-container">
              <button className="git-branch-button" onClick={handleBranchClick}>
                Create branch{" "}
                <span className={`arrow ${showBranchInput ? "down" : ""}`}>
                  <MdExpandMore />
                </span>
              </button>
              {showBranchInput && (
                <input
                  type="text"
                  readOnly
                  className="git-branch-input"
                  value={`git checkout -b ${id}-${name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                />
              )}
            </div>
            <div className="commit-container">
              <button className="commit-button" onClick={handleCommitClick}>
                Create commit{" "}
                <span className={`arrow ${showCommitInput ? "down" : ""}`}>
                  <MdExpandMore />
                </span>
              </button>
              {showCommitInput && (
                <>
                  <input
                    type="text"
                    readOnly
                    className="issue-key-input"
                    value={id}
                  />
                  <input
                    type="text"
                    readOnly
                    className="commit-sample-input"
                    value={`git commit -m "${id} <message>"`}
                  />
                </>
              )}
            </div>
          </div>
          {hasChanges && (
            <button className="update-button" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default CardModal;
