import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import CardModal from "./CardModal";
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

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId.replace(/-/g, " ");
    const destStatus = destination.droppableId.replace(/-/g, " ");

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const cards = Array.from(
        issues.filter((card) => card.status === sourceStatus)
      );
      const [movedCard] = cards.splice(source.index, 1);
      cards.splice(destination.index, 0, movedCard);

      const updatedIssues = issues.map((issue) => {
        if (issue.id === movedCard.id) {
          return { ...issue, index: destination.index };
        }
        return issue;
      });

      setIssues(updatedIssues);
    } else {
      // Moving to a different column
      const sourceCards = Array.from(
        issues.filter((card) => card.status === sourceStatus)
      );
      const [movedCard] = sourceCards.splice(source.index, 1);

      const updatedIssues = issues.map((issue) => {
        if (issue.id === movedCard.id) {
          return { ...issue, status: destStatus };
        }
        return issue;
      });

      setIssues(updatedIssues);
    }
  };

  return (
    <main className="content">
      <div className="active-head">
        <h2>Active Sprints</h2>
      </div>

      <div className="task-status">
        <div className="task-status-style">TO DO</div>
        <div className="task-status-style">IN PROGRESS</div>
        <div className="task-status-style">PAUSED</div>
        <div className="task-status-style">IN REVIEW</div>
        <div className="task-status-style">DONE</div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="card-containers">
          {["New", "In Progress", "Paused", "In Review", "Done"].map(
            (status) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`card-container ${status
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    style={{ minHeight: 500 }}
                  >
                    {issues
                      .filter((card) => card.status === status)
                      .map((card, index) => (
                        <Draggable
                          key={card.id}
                          draggableId={card.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                margin: "0 0 8px 0",
                                minHeight: "50px",
                                color: "black",
                                ...provided.draggableProps.style,
                              }}
                              onClick={() => handleCardClick(card)}
                            >
                              <Card {...card} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )
          )}
        </div>
      </DragDropContext>

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
