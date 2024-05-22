import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./CardDetailPage.css";
import { BsFillBookmarkStarFill, BsLightningChargeFill } from "react-icons/bs";
import { IoMdCheckbox } from "react-icons/io";
import { TbAlertSquareFilled } from "react-icons/tb";
import { FaEquals } from "react-icons/fa";
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";

const CardDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("activeSprintsData");
    if (storedData) {
      const cards = JSON.parse(storedData);
      const selectedCard = cards.find((card) => card.id === id);
      setCard(selectedCard);
    }
  }, [id]);

  if (!card) return <p>Loading...</p>;

  return (
    <div className="card-detail-page">
      <div className="card-detail-container">
        <div className="modal-header">
          <div className="header-left">
            <span className="modal-icon">{getTypeIcon(card.type)}</span>
            <h2 className="modal-id">{card.id}</h2>
          </div>
          <div className="header-right">
            <button
              className="copy-button"
              onClick={() => copyLinkToClipboard(card.id)}
            >
              Copy Link
            </button>
            <div onClick={() => window.history.back()}>&#10005;</div>
          </div>
        </div>
        <div className="modal-content">
          <div className="main-content">
            <div className="priority-icon">
              {getPriorityIcon(card.priority)}
            </div>
            <h1 className="modal-title">{card.name}</h1>
            <p className="modal-description">{card.description}</p>
            <p className="modal-points">Points: {card.points}</p>
            <p className="modal-type">Type: {card.type}</p>
          </div>
          <div className="details-content">
            <h3>Details</h3>
            <p>
              <strong>Points:</strong> {card.points}
            </p>
            <p>
              <strong>Priority:</strong> {card.priority}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;

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
  const link = `${window.location.origin}/card/${id}?redirect=true`;
  navigator.clipboard.writeText(link).then(() => {
    alert("Link copied to clipboard!");
  });
};
