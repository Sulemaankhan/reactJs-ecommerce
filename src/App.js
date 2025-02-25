import logo from './logo.svg';
import './App.css';
import Bar from './navigation/HeaderBar';
import Products from './products/components/Products';
import Product1 from './products/Product1';
import NavigationBar from './navigation/NavigationBar';
import { Browser, Routes, Route } from 'react-router';
import Western from './products/components/Western';
import Accesseries from './products/components/Accesseries';
import Footbear from './products/components/Footbear';
import Tredentional from './products/components/Tredentional';
import Watches from './products/components/Watches';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavigationBar />} >
          <Route path="/Western" element={<Western />} />
          <Route path="/Accesseries" element={<Accesseries />} />
          <Route path="/Western" element={<Western />} />
          <Route path="/Footbear" element={<Footbear />} />
          <Route path="/Tredentional" element={<Tredentional />} />
          <Route path="/Watches" element={<Watches />} />
          <Route path="/Products" element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
