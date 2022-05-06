import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FileTable from "./components/FileTable"
import Home from "./components/Home"
import UploadFile from './components/UploadFile';

const App = () => (

    <Router>
        <Routes>
            <Route path='/files' element={< FileTable />} />
            <Route path='/files/uploadFile' element={< UploadFile />} />
            <Route path='/' element={< Home />} />
        </Routes>
    </Router>

)

export default App;