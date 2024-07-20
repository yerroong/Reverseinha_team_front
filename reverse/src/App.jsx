import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Consulting from './pages/Consulting/Consulting';
import Record from './pages/Record/Record';
import Community from './pages/Community';
import Mypage from './pages/Mypage';

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/record" element={<Record />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;