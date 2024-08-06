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
import Retest from './pages/Extratest/Retest';
import Retrytest from './pages/Selftest/Retrytest';
import ConsultationApplication from './pages/Consulting/ConsultationApplication';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}> {/* 환경 변수 사용 */}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/record" element={<Record />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/write" element={<Communitywrite />} />
          <Route path="/community/:id" element={<Communityread />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signtest" element={<Signtest />} />
          <Route path="/retest" element={<Retest />} />
          <Route path="/retrytest" element={<Retrytest />} />
          <Route path="/consulting/application" element={<ConsultationApplication />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
