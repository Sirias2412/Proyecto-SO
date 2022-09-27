import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;