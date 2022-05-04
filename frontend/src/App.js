
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css'

let App = () => {
  <Router>
      <Routes>
        <Route path="/files" element={<Home />} />
      </Routes>
  </Router>
}

export default App;
