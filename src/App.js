import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import MultiImageUpload from "./Upload";
import Preview from "./Preview";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/upload" element={<MultiImageUpload />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
