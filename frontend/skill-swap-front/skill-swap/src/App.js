import Navbar from './Components/Navbar/Navbar';
import { Routes, Route, Link } from 'react-router-dom';
import LoginRegister from './Pages/LoginRegister/LoginRegister';
import LandingPage from './Pages/LandingPage/LandingPage';
import AboutUs from './Pages/AboutUs/AboutUs';
import UserProfile from './Pages/UserProfile/UserProfile';
import DiscoverPage from './Pages/DiscoverPage/DIscoverPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import ChatPage from './Pages/ChatPage/ChatPage';

//enter point

function App() {
  return (
    <div>
        <Navbar />

        <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/DiscoverPage' element={<DiscoverPage />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/WhyUs' element={<ProfilePage />} />
        <Route path='/LoginRegister' element={<LoginRegister />}/>
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/ChatPage' element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
