import React, { useMemo, useState, useEffect } from "react";
import Card from "./Card";
import CardModal from "./CardModal";
import BasicModal from "./BasicModal";
import "./Card.css";
import "./Modal.css";

const ActiveSprints = ({ issues, setIssues }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };
  const updateCard = (updatedCard) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === updatedCard.id ? updatedCard : issue
      )
    );
  };
  useEffect(() => {
    const storedData = localStorage.getItem("activeSprintsData");
    if (storedData) {
      setIssues(JSON.parse(storedData));
    }
  }, [setIssues]);

  useEffect(() => {
    if (issues.length > 0) {
      localStorage.setItem("activeSprintsData", JSON.stringify(issues));
    }
  }, [issues]);

  const toDoCards = useMemo(
    () => issues.filter((card) => card.status === "New"),
    [issues]
  );
  const inProgressCards = useMemo(
    () => issues.filter((card) => card.status === "In Progress"),
    [issues]
  );
  const pausedCards = useMemo(
    () => issues.filter((card) => card.status === "Paused"),
    [issues]
  );
  const inReviewCards = useMemo(
    () => issues.filter((card) => card.status === "In Review"),
    [issues]
  );
  const doneCards = useMemo(
    () => issues.filter((card) => card.status === "Done"),
    [issues]
  );

  return (
    <main className="content">
      <div className="active-head">
        <h2>Active Sprints</h2>
        {/* <BasicModal setIssues={setIssues} /> */}
      </div>

      <div className="task-status">
        <div className="task-status-style">TO DO</div>
        <div className="task-status-style">IN PROGRESS</div>
        <div className="task-status-style">PAUSED</div>
        <div className="task-status-style">IN REVIEW</div>
        <div className="task-status-style">DONE</div>
      </div>

      <div className="card-containers">
        <div className="card-container to-do">
          {toDoCards.map((card) => (
            <Card
              key={card.id}
              {...card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>

        <div className="card-container in-progress">
          {inProgressCards.map((card) => (
            <Card
              key={card.id}
              {...card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>

        <div className="card-container paused">
          {pausedCards.map((card) => (
            <Card
              key={card.id}
              {...card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>

        <div className="card-container in-review">
          {inReviewCards.map((card) => (
            <Card
              key={card.id}
              {...card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>

        <div className="card-container done">
          {doneCards.map((card) => (
            <Card
              key={card.id}
              {...card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>
      {selectedCard && (
        <CardModal
          isOpen={true}
          handleClose={() => setSelectedCard(null)}
          card={selectedCard}
          updateCard={updateCard}
        />
      )}
    </main>
  );
};

export default ActiveSprints;
