import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArtistPortal from './pages/ArtistPortal';
import FanPortal from './pages/FanPortal';

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<ArtistPortal />} />
        <Route path="/fan" element={<FanPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
