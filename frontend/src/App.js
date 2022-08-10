import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import UpdateForm from './components/forms/UpdateForm';
import Login from './components/forms/Login';
import NavBar from './components/commons/navbar/NavBar';
import Stadistics from './components/stadistics/Stadistics';
import Searcher from './components/searcher/Searcher';
import DeviceForm from './components/forms/deviceForm/DeviceForm';
import Calendar from './components/scheduler/Scheduler';
import Footer from './components/commons/Footer'
import { useState } from "react"

const App = () => {
    const [showNav, setShowNav] = useState(true);

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login setShowNav={setShowNav} />} />
                </Routes>
            </Router>

            {showNav
                ?
                <NavBar></NavBar>
                :
                ""
            }

            <div className='container'>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home setShowNav={setShowNav} />} />
                        <Route path='/update_form/:id' element={<UpdateForm />} />
                        <Route path='/stadistics' element={<Stadistics />} />
                        <Route path='/finder' element={<Searcher />} />
                        <Route path='/device' element={<DeviceForm />} />
                        <Route path='/calendar' element={<Calendar />} />
                    </Routes>
                </Router>
            </div>
            {showNav
                ?
                <Footer></Footer>
                :
                ""
            }
        </>
    )
}





export default App;