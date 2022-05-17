import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import UpdateForm from './components/UpdateForm';
import Login from './components/Login';
import Extraction from './components/Extraction';
const App = () => (

    <Router>
        <Routes>
            <Route path='/' element={< Home />} />
            <Route path='/login' element={< Login />} />
            <Route path='/update_form/:id' element={<UpdateForm/>} />
            <Route path='/extraction/:id' element={<Extraction/>} />
        </Routes>
    </Router>

)

export default App;