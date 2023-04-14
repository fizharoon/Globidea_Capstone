import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './Pages';
import Phase1 from './Pages/Phase1/phase1';
import Phase2 from './Pages/Phase2/phase2';
import Phase3 from './Pages/Phase3/phase3';
import Phase4 from './Pages/Phase4/phase4';
import Phase5 from './Pages/Phase5/phase5';
import AdminSignIn from './Pages/adminsignin';
import WithoutNav from './Components/WithoutNav';
import WithNav from './Components/WithNav';
import CuratorPage from './Pages/curatorpage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/adminsignin" element={<AdminSignIn />} />
          <Route path="/curatorpage" element={<CuratorPage/>}/>
        </Route>
        <Route element={<WithNav />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/phase1" element={<Phase1 />} />
          <Route path="/phase2" element={<Phase2 />} />
          <Route path="/phase3" element={<Phase3 />} />
          <Route path="/phase4" element={<Phase4 />} />
          <Route path="/phase5" element={<Phase5 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
