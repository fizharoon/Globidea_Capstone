import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Welcome from './Pages';
import Phase_1 from './Pages/phase1';
import Phase_2 from './Pages/phase2';
import Phase_3 from './Pages/phase3';
import Phase_4 from './Pages/phase4';
import Phase_5 from './Pages/phase5';
import SignIn from './Pages/signin';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/phase1" element={<Phase_1 />} />
        <Route path="/phase2" element={<Phase_2 />} />
        <Route path="/phase3" element={<Phase_3 />} />
        <Route path="/phase4" element={<Phase_4 />} />
        <Route path="/phase5" element={<Phase_5 />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
