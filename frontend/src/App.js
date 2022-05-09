import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FileTable from "./components/FileTable"
import Home from "./components/Home"
import UploadForm from './components/UploadForm';

const App = () => (

    <Router>
        <Routes>
            <Route path='/' element={< Home />} />
            <Route path='/files' element={< FileTable />} />
            <Route path='/files/uploadFile' element={< UploadForm />} />
        </Routes>
    </Router>

)

export default App;