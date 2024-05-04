import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pay from "./Pay";
import Success from "./Success";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pay" element={<Pay />} />
      </Routes>
      <Routes>
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;