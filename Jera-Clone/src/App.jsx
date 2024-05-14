import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Backlogs from "./components/Backlogs";
import ActiveSprints from "./components/ActiveSprints";
import Layout from "./components/Layout";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<div>Home</div>}></Route>
            <Route path="/backlog" element={<Backlogs />}></Route>
            <Route path="/active-sprints" element={<ActiveSprints />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
