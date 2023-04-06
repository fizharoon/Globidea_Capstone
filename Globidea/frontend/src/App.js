import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Welcome from './Pages';
import Phase_1 from './Pages/Phase1/phase1';
import Phase_2 from './Pages/Phase2/phase2';
import Phase_3 from './Pages/Phase3/phase3';
import Phase_4 from './Pages/Phase4/phase4';
import Phase_5 from './Pages/Phase5/phase5';
import AdminSignIn from './Pages/adminsignin';
import WithoutNav from './Components/WithoutNav';
import WithNav from './Components/WithNav';

import Curator_Page from './Pages/curatorpage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/adminsignin" element={<AdminSignIn />} />
          <Route path="/curatorpage" element={<Curator_Page/>}/>
        </Route>
        <Route element={<WithNav />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/phase1" element={<Phase_1 />} />
          <Route path="/phase2" element={<Phase_2 />} />
          <Route path="/phase3" element={<Phase_3 />} />
          <Route path="/phase4" element={<Phase_4 />} />
          <Route path="/phase5" element={<Phase_5 />} />
        </Route>
      </Routes>

      {/* <Navbar/>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/phase1" element={<Phase_1 />} />
        <Route path="/phase2" element={<Phase_2 />} />
        <Route path="/phase3" element={<Phase_3 />} />
        <Route path="/phase4" element={<Phase_4 />} />
        <Route path="/phase5" element={<Phase_5 />} />

      </Routes>
      <Routes>
        <Route path="/adminsignin" element={<AdminSignIn />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
