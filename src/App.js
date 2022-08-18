import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { HOME } from "./constants/routes";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${HOME}`} element={<Home />} exact />
      </Routes>
    </Router>
  );
}

export default App;
