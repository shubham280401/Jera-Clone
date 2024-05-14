import Card from "./Card";
import { useMemo, useState } from "react";
import "./Card.css";
const activeSprintsData = [
  {
    name: "Fix login page layout",
    status: "In Review",
    id: "PROJ-123",
    type: "Bug",
    points: 5,
  },
  {
    name: "Implement user profile feature",
    status: "To Do",
    id: "PROJ-124",
    type: "Feature",
    points: 8,
  },
  {
    name: "Update database schema",
    status: "Done",
    id: "PROJ-125",
    type: "Task",
    points: 3,
  },
  {
    name: "Fix navigation bar styling",
    status: "In Progress",
    id: "PROJ-126",
    type: "Bug",
    points: 5,
  },
  {
    name: "Create API documentation",
    status: "Paused",
    id: "PROJ-127",
    type: "Task",
    points: 2,
  },
  {
    name: "Add search functionality",
    status: "To Do",
    id: "PROJ-128",
    type: "Feature",
    points: 13,
  },
  {
    name: "Fix broken links on homepage",
    status: "In Progress",
    id: "PROJ-129",
    type: "Bug",
    points: 5,
  },
  {
    name: "Refactor backend code",
    status: "To Do",
    id: "PROJ-130",
    type: "Task",
    points: 8,
  },
  {
    name: "Implement user authentication",
    status: "Done",
    id: "PROJ-131",
    type: "Feature",
    points: 10,
  },
  {
    name: "Optimize front-end performance",
    status: "In Progress",
    id: "PROJ-132",
    type: "Task",
    points: 5,
  },
];
const ActiveSprints = () => {
  const [data, setData] = useState([]);
  const toDoCards = useMemo(
    () => activeSprintsData.filter((card) => card.status === "To Do"),
    [activeSprintsData]
  );
  const inProgressCards = useMemo(
    () => activeSprintsData.filter((card) => card.status === "In Progress"),
    [activeSprintsData]
  );
  const pausedCards = useMemo(
    () => activeSprintsData.filter((card) => card.status === "Paused"),
    [activeSprintsData]
  );
  const inReviewCards = useMemo(
    () => activeSprintsData.filter((card) => card.status === "In Review"),
    [activeSprintsData]
  );
  const doneCards = useMemo(
    () => activeSprintsData.filter((card) => card.status === "Done"),
    [activeSprintsData]
  );
  return (
    <main className="content">
      <h2>Active Sprints</h2>
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
            <Card key={card.id} {...card} />
          ))}
        </div>
        <div className="card-container in-progress">
          {inProgressCards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
        <div className="card-container paused">
          {pausedCards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
        <div className="card-container in-review">
          {inReviewCards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
        <div className="card-container done">
          {doneCards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ActiveSprints;
