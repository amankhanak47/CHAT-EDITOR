
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Chat from './component/Chat';

function App() {

 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route path={"/chat"} element={<Chat />} />
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
