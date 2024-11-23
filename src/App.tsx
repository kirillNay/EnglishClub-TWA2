import "./App.css";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import WordCard from "./word_card/components/WordCard";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="word" element={<WordCard />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
