import './App.css';


import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
// import Detail from './components/Detail/Detail';


const App = () =>{

  return (
    
    <div className="App">
      
         <Navbar/>

      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        {/* <Route path='/detail/:id' element={<Detail/>}/> */}
        
      </Routes>
    </div>
  );
}

export default App;
