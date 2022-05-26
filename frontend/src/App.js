import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import UpdateForm from './components/UpdateForm';
import Login from './components/Login';
import Extraction from './components/Extraction';
import NavBar from './components/NavBar';
import Stadistics from './components/Stadistics';
import Searcher from './components/searcher/Searcher';
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
                </Routes>
            </Router>
        </div>
    </>

)

export default App;