
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileTable from './components/FileTable';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css'

let App = () => {
  <Router>
      <Routes>
        <Route path='/files' element={<FileTable />} />
        <Route path='/' element={<Home />} />
      </Routes>
  </Router>
}

export default App;
