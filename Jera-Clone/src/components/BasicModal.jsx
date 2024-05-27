import React, { useState } from "react";
import Select from "react-select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
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
import "./Modal.css";

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

function generateRandomId() {
  let id = "";
  const letters = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    id += letters.charAt(randomIndex);
  }

  return id;
}

function BasicModal({ setIssues }) {
  const [open, setOpen] = useState(false);
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
    const newTask = {
      id: generateRandomId(),
      name: title,
      type: type.value,
      points: points,
      status: status.label,
      priority: priority.value,
      description: description,
    };
    setIssues((prev) => [...prev, newTask]);
    console.log("issues:", setIssues);
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
    handleClose();
  };

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
    { value: "Chore", label: "Chore", icon: <IoMdCheckbox color="#4db8ff" /> },
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
                handleCreateIssue();
                toast.success("Issue created!");
              }}
              className="create-button"
            >
              Create Issue
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;

// import React, { useState } from "react";
// import Select from "react-select";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import { toast } from "react-toastify";
// import { BsFillBookmarkStarFill } from "react-icons/bs";
// import { IoMdCheckbox } from "react-icons/io";
// import { TbAlertSquareFilled } from "react-icons/tb";
// import { BsLightningChargeFill } from "react-icons/bs";
// import { FaEquals } from "react-icons/fa";
// import {
//   MdOutlineKeyboardDoubleArrowUp,
//   MdOutlineKeyboardArrowUp,
//   MdKeyboardDoubleArrowDown,
// } from "react-icons/md";
// import "./Modal.css";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 8,
// };

// function generateRandomId() {
//   let id = "";
//   const letters = "abcdefghijklmnopqrstuvwxyz";

//   for (let i = 0; i < 6; i++) {
//     const randomIndex = Math.floor(Math.random() * letters.length);
//     id += letters.charAt(randomIndex);
//   }

//   return id;
// }

// // Modal component
// function BasicModal({ setIssues }) {
//   const [open, setOpen] = useState(false);
//   // const [selectedCard, setSelectedCard] = useState(null);
//   const [title, setTitle] = useState("");
//   const [status, setStatus] = useState({ value: "new", label: "New" });
//   const [description, setDescription] = useState("");
//   const [points, setPoints] = useState("");
//   const [type, setType] = useState(null);
//   const [priority, setPriority] = useState({
//     value: "Normal",
//     label: "Normal",
//     icon: <FaEquals color="green" />,
//   });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   // const handleCardClick = (card) => {
//   //   setSelectedCard(card);
//   //   handleOpen();
//   // };
//   const handleInputChange = (event) => {
//     setTitle(event.target.value);
//   };
//   const handleStatusChange = (selectedOption) => {
//     setStatus(selectedOption);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handlePointsChange = (event) => {
//     setPoints(event.target.value);
//   };
//   const handlePriorityChange = (selectedOption) => {
//     setPriority(selectedOption);
//   };
//   const handleTypeChange = (selectedOption) => {
//     setType(selectedOption);
//   };
//   const handleCreateIssue = () => {
//     console.log("Creating issue with title:", title);
//     console.log("Selected status:", status);
//     console.log("Description:", description);
//     console.log("Selected priority:", priority.value);
//     console.log("Points", points);
//     const newTask = {
//       id: generateRandomId(),
//       name: title,
//       type: type.value,
//       points: points,
//       status: status.label,
//       priority: priority.value,
//       description: description,
//     };
//     setIssues((prev) => [...prev, newTask]);
//     setTitle("");
//     setStatus({ value: "new", label: "New" });
//     setDescription("");
//     setPoints("");
//     setType(null);
//     setPriority({
//       value: "Normal",
//       label: "Normal",
//       icon: <FaEquals color="green" />,
//     });
//     // toast.success("Issue created");
//     handleClose();
//   };
//   // function NotifyCreate() {
//   //   const notify = () => {
//   //     handleCreateIssue();
//   //     toast.success("Testing Toast Notification");
//   //   };

//   //   return (
//   //     <div>
//   //       <button onClick={notify} className="create-button">
//   //         Create Issue
//   //       </button>
//   //       <ToastContainer />
//   //     </div>
//   //   );
//   // }
//   const statusOptions = [{ value: "new", label: "New" }];
//   const priorityOptions = [
//     { value: "Normal", label: "Normal", icon: <FaEquals color="green" /> },
//     {
//       value: "Critical",
//       label: "Critical",
//       icon: <MdOutlineKeyboardDoubleArrowUp color="red" />,
//     },
//     {
//       value: "Low",
//       label: "Low",
//       icon: <MdKeyboardDoubleArrowDown color="blue" />,
//     },
//     {
//       value: "High",
//       label: "High",
//       icon: <MdOutlineKeyboardArrowUp color="orange" />,
//     },
//   ];
//   const typeOptions = [
//     {
//       value: "Story",
//       label: "Story",
//       icon: <BsFillBookmarkStarFill color="green" />,
//     },
//     {
//       value: "Chore",
//       label: "Chore",
//       icon: <IoMdCheckbox color="#4db8ff" />,
//     },
//     {
//       value: "Bug",
//       label: "Bug",
//       icon: <TbAlertSquareFilled color="#ff3300" />,
//     },
//     {
//       value: "Epic",
//       label: "Epic",
//       icon: <BsLightningChargeFill color="#8f00b3" />,
//     },
//   ];
//   return (
//     <div className="modal-container">
//       <Button onClick={handleOpen} className="modal-button">
//         Create
//       </Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <h2 className="modal-heading">Create Issue</h2>
//           <div className="modal-input">
//             <label htmlFor="issue-title">Title:</label>
//             <input
//               id="issue-title"
//               type="text"
//               value={title}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="modal-input">
//             <label htmlFor="issue-type">Issue Type</label>
//             <Select
//               id="issue-type"
//               value={type}
//               onChange={handleTypeChange}
//               options={typeOptions}
//               getOptionLabel={(option) => (
//                 <div>
//                   {option.icon} {option.label}
//                 </div>
//               )}
//               getOptionValue={(option) => option.value}
//               isSearchable={false}
//             />
//           </div>
//           <div className="modal-input">
//             <label htmlFor="issue-status">Status:</label>
//             <Select
//               id="issue-status"
//               value={status}
//               onChange={handleStatusChange}
//               options={statusOptions}
//             />
//           </div>
//           <div className="modal-input">
//             <label htmlFor="issue-points">Story Points: </label>
//             <input
//               type="number"
//               id="issue-points"
//               value={points}
//               onChange={handlePointsChange}
//             />
//           </div>
//           <div className="modal-input">
//             <label htmlFor="issue-description">Description:</label>
//             <textarea
//               id="issue-description"
//               value={description}
//               onChange={handleDescriptionChange}
//             />
//           </div>
//           <div className="modal-input">
//             <label htmlFor="issue-priority">Priority:</label>
//             <Select
//               id="issue-priority"
//               value={priority}
//               onChange={handlePriorityChange}
//               options={priorityOptions}
//               getOptionLabel={(option) => (
//                 <div>
//                   {option.icon} {option.label}
//                 </div>
//               )}
//               getOptionValue={(option) => option.value}
//               isSearchable={false}
//             />
//           </div>
//           <div className="create-button-container">
//             <Button
//               onClick={() => {
//                 console.log("handleCreateIssue called!");
//                 console.log("Modal received setIssues:", setIssues); // Verify this appears in console
//                 handleCreateIssue();
//                 toast.success("Issue created!");
//               }}
//               className="create-button"
//             >
//               Create Issue
//             </Button>

//             {/* <NotifyCreate
//                 className="create-button"
//                 onClick={() => toast.success("Testing Toast Notification")}
//               /> */}
//             {/* <button onClick={() => toast.success("Testing Toast Notification")}>
//                 Test Toast
//               </button> */}
//           </div>
//         </Box>
//       </Modal>
//       {/* <CardModal isOpen={open} handleClose={handleClose} /> */}
//     </div>
//   );
// }
// export default BasicModal;
