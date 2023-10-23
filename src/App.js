import logo from './logo.svg';
import './App.css';
import { fetchuser } from './Server';
import List from './components/List';
import Create from './components/Create';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Create/>}/>
        <Route exact path='/read' element={<List/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
