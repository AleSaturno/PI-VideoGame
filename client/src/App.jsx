import './App.css';
import {Route, Routes, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail';
import CreateForms from './components/CreateForm/CreateForms';
import { useState } from 'react';


const App = () =>{
  const location = useLocation();
  const [page, setPage] = useState(0);

  return (
    
    <div className="App">
      
      {location.pathname !== '/' && <Navbar setPage={setPage} />}
      
      
      
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home page={page} setPage={setPage}/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='createForm' element={<CreateForms/>}/>
      </Routes>
    </div>
  );
}

export default App;
