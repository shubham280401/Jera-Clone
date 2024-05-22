import Card from "./Card";
import "./Modal.css";
import { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import CardModal from "./CardModal";

import "./Card.css";
import Select from "react-select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
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

// Styling for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

// const getTypeIcon = (type) => {
//   switch (type.value) {
//     case "Story":
//       return <BsFillBookmarkStarFill color="green" />;
//     case "Chore":
//       return <IoMdCheckbox color="#4db8ff" />;
//     case "Bug":
//       return <TbAlertSquareFilled color="#ff3300" />;
//     case "Epic":
//       return <BsLightningChargeFill color="#8f00b3" />;

//     default:
//       return null;
//   }
// };
// const getPriorityIcon = (priority) => {
//   switch (priority.value) {
//     case "Normal":
//       return <FaEquals color="green" />;
//     case "Critical":
//       return <MdOutlineKeyboardDoubleArrowUp color="red" />;
//     case "High":
//       return <MdOutlineKeyboardArrowUp color="orange" />;
//     case "Low":
//       return <MdKeyboardDoubleArrowDown color="blue" />;
//     default:
//       return null;
//   }
// };
function generateRandomId() {
  let id = "";
  const letters = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    id += letters.charAt(randomIndex);
  }

  return id;
}

// Modal component
function BasicModal({ setActiveSprintsData }) {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState({ value: "new", label: "New" });
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [type, setType] = useState(null);
  const [priority, setPriority] = useState({
    value: "Normal",
    label: "Normal",
    icon: <FaEquals color="green" />,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const handleCardClick = (card) => {
  //   setSelectedCard(card);
  //   handleOpen();
  // };
  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };
  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };
  const handlePriorityChange = (selectedOption) => {
    setPriority(selectedOption);
  };
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption);
  };
  const handleCreateIssue = () => {
    console.log("Creating issue with title:", title);
    console.log("Selected status:", status);
    console.log("Description:", description);
    console.log("Selected priority:", priority.value);
    console.log("Points", points);
    const newTask = {
      id: generateRandomId(),
      name: title,
      type: type.value,
      points: points,
      status: status.label,
      priority: priority.value,
      description: description,
    };
    setActiveSprintsData((prev) => [...prev, newTask]);
    setTitle("");
    setStatus({ value: "new", label: "New" });
    setDescription("");
    setPoints("");
    setType(null);
    setPriority({
      value: "Normal",
      label: "Normal",
      icon: <FaEquals color="green" />,
    });
    // toast.success("Issue created");
    handleClose();
  };
  // function NotifyCreate() {
  //   const notify = () => {
  //     handleCreateIssue();
  //     toast.success("Testing Toast Notification");
  //   };

  //   return (
  //     <div>
  //       <button onClick={notify} className="create-button">
  //         Create Issue
  //       </button>
  //       <ToastContainer />
  //     </div>
  //   );
  // }
  const statusOptions = [{ value: "new", label: "New" }];
  const priorityOptions = [
    { value: "Normal", label: "Normal", icon: <FaEquals color="green" /> },
    {
      value: "Critical",
      label: "Critical",
      icon: <MdOutlineKeyboardDoubleArrowUp color="red" />,
    },
    {
      value: "Low",
      label: "Low",
      icon: <MdKeyboardDoubleArrowDown color="blue" />,
    },
    {
      value: "High",
      label: "High",
      icon: <MdOutlineKeyboardArrowUp color="orange" />,
    },
  ];
  const typeOptions = [
    {
      value: "Story",
      label: "Story",
      icon: <BsFillBookmarkStarFill color="green" />,
    },
    {
      value: "Chore",
      label: "Chore",
      icon: <IoMdCheckbox color="#4db8ff" />,
    },
    {
      value: "Bug",
      label: "Bug",
      icon: <TbAlertSquareFilled color="#ff3300" />,
    },
    {
      value: "Epic",
      label: "Epic",
      icon: <BsLightningChargeFill color="#8f00b3" />,
    },
  ];
  return (
    <div className="modal-container">
      <Button onClick={handleOpen} className="modal-button">
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="modal-heading">Create Issue</h2>
          <div className="modal-input">
            <label htmlFor="issue-title">Title:</label>
            <input
              id="issue-title"
              type="text"
              value={title}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-input">
            <label htmlFor="issue-type">Issue Type</label>
            <Select
              id="issue-type"
              value={type}
              onChange={handleTypeChange}
              options={typeOptions}
              getOptionLabel={(option) => (
                <div>
                  {option.icon} {option.label}
                </div>
              )}
              getOptionValue={(option) => option.value}
              isSearchable={false}
            />
          </div>
          <div className="modal-input">
            <label htmlFor="issue-status">Status:</label>
            <Select
              id="issue-status"
              value={status}
              onChange={handleStatusChange}
              options={statusOptions}
            />
          </div>
          <div className="modal-input">
            <label htmlFor="issue-points">Story Points: </label>
            <input
              type="number"
              id="issue-points"
              value={points}
              onChange={handlePointsChange}
            />
          </div>
          <div className="modal-input">
            <label htmlFor="issue-description">Description:</label>
            <textarea
              id="issue-description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="modal-input">
            <label htmlFor="issue-priority">Priority:</label>
            <Select
              id="issue-priority"
              value={priority}
              onChange={handlePriorityChange}
              options={priorityOptions}
              getOptionLabel={(option) => (
                <div>
                  {option.icon} {option.label}
                </div>
              )}
              getOptionValue={(option) => option.value}
              isSearchable={false}
            />
          </div>
          <div className="create-button-container">
            <Button
              onClick={() => {
                console.log("handleCreateIssue called!"); // Verify this appears in console
                handleCreateIssue();
                toast.success("Issue created!");
              }}
              className="create-button"
            >
              Create Issue
            </Button>

            {/* <NotifyCreate
              className="create-button"
              onClick={() => toast.success("Testing Toast Notification")}
            /> */}
            {/* <button onClick={() => toast.success("Testing Toast Notification")}>
              Test Toast
            </button> */}
          </div>
        </Box>
      </Modal>
      <CardModal isOpen={open} handleClose={handleClose} card={selectedCard} />
    </div>
  );
}

const ActiveSprints = () => {
  const [activeSprintsData, setActiveSprintsData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  console.log(activeSprintsData);
  const storedData = localStorage.getItem("activeSprintsData");
  useEffect(() => {
    console.log(storedData);
    if (storedData) {
      setActiveSprintsData(JSON.parse(storedData));
      console.log(storedData);
    }
  }, [storedData]);

  useEffect(() => {
    if (activeSprintsData.length > 0) {
      localStorage.setItem(
        "activeSprintsData",
        JSON.stringify(activeSprintsData)
      );
    }
  }, [activeSprintsData]);

  // Memoized arrays for different card statuses

  const toDoCards = useMemo(
    () => activeSprintsData.filter((card) => card.status === "New"),
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
      <div className="active-head">
        <h2>Active Sprints</h2>
        {/* Including the Modal component */}
        <BasicModal setActiveSprintsData={setActiveSprintsData} />
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
          isOpen={true} // or you can use a state to control its visibility
          handleClose={() => setSelectedCard(null)}
          card={selectedCard}
        />
      )}
    </main>
  );
};

export default ActiveSprints;
