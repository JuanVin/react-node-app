import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import UpdateForm from './components/forms/UpdateForm';
import Login from './components/forms/Login';
import Extraction from './components/Extraction';
import NavBar from './components/commons/navbar/NavBar';
import Stadistics from './components/stadistics/Stadistics';
import Searcher from './components/searcher/Searcher';
import DeviceForm from './components/forms/deviceForm/DeviceForm';
const App = () => (
    <>
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>

        <NavBar></NavBar>
        <div className="container">
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/update_form/:id' element={<UpdateForm />} />
                    <Route path='/extraction/:id' element={<Extraction />} />
                    <Route path='/stadistics' element={<Stadistics />} />
                    <Route path='/finder' element={<Searcher />} />
                    <Route path='/device' element={<DeviceForm/>} />
                </Routes>
            </Router>

        </div>
    </>

)

export default App;