import Card from "./Card";
import "./Card.css";
const backlogData = [
  {
    name: "Fix login page layout",
    status: "In Progress",
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
    status: "To Do",
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

const Backlogs = ({ name, type, id, points, status }) => {
  return (
    <main className="content">
      <h2>Backlogs</h2>
      <ul className="card-list">
        {backlogData.map((card) => (
          <li key={card.id}>
            <Card
              name={card.name}
              type={card.type}
              id={card.id}
              status={card.status}
              points={card.points}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Backlogs;
