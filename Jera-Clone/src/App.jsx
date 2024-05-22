import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backlogs from "./components/Backlogs";
import ActiveSprints from "./components/ActiveSprints";
import Layout from "./components/Layout";
import CardDetailPage from "./components/CardDetailPage";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<div>Home</div>}></Route>
            <Route path="/backlog" element={<Backlogs />}></Route>
            <Route path="/active-sprints" element={<ActiveSprints />}></Route>
            <Route path="/card/:id" element={<CardDetailPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
