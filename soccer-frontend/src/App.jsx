import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Stats from "./pages/Stats";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import Teams from "./pages/Teams";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/players" element={<Players />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/teams" element={<Teams />} />
    </Routes>
  </Router>
);

export default App;

