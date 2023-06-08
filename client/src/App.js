import './App.css';
import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing'


const App = () =>{
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
