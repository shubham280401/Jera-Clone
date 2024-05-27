import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backlogs from "./components/Backlogs";
import ActiveSprints from "./components/ActiveSprints";
import Layout from "./components/Layout";
import CardDetailPage from "./components/CardDetailPage";
import Header from "./components/Header";
import { useState } from "react";
function App() {
  const [issues, setIssues] = useState([]);
  return (
    <div className="app">
      <BrowserRouter>
        <Header setIssues={setIssues} />
        <Layout setIssues={setIssues}>
          <Routes>
            <Route path="/" element={<div>Home</div>}></Route>
            <Route
              path="/backlog"
              element={
                <Backlogs issues={issues} onClick={<CardDetailPage />} />
              }
            ></Route>
            <Route
              path="/active-sprints"
              element={<ActiveSprints issues={issues} setIssues={setIssues} />}
            ></Route>
            <Route path="/card/:id" element={<CardDetailPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
