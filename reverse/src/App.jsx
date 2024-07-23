import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Consulting from './pages/Consulting/Consulting';
import Record from './pages/Record/Record';
import Community from './pages/Community/Community';
import Communitywrite from './pages/Community/Communitywrite';
import Communityread from './pages/Community/Communityread';
import Mypage from './pages/Mypage/Mypage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Signtest from './pages/Selftest/Signtest';
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
          <Route path="/community/write" element={<Communitywrite />} />
          <Route path="/Community/read/:id" element={<Communityread />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signtest" element={<Signtest />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;