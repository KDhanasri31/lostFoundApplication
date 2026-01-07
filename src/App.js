import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './Components/LoginComponents/LoginPage';
import RegisterUser from './Components/LoginComponents/RegisterUser';
import StudentMenu from './Components/LoginComponents/StudentMenu';
import LostItemEntry from './Components/ItemComponent/LostItemEntry';
import LostItemReport from './Components/ItemComponent/LostItemReport';
import FoundItemEntry from './Components/ItemComponent/FoundItemEntry';
import FoundItemReport from './Components/ItemComponent/FoundItemReport';
import AdminMenu from "./Components/LoginComponents/AdminMenu";
import StudentList from "./Components/LoginComponents/StudentList";
import ChatMessage from "./MessageComponent/ChatMessage";
import ProfileMenu from "./Components/LoginComponents/ProfileMenu";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterUser />} />
          <Route path="/AdminMenu" element={<AdminMenu />} />
          <Route path="/StudentMenu" element={<StudentMenu />} />
          <Route path="/lost-entry" element={<LostItemEntry />} />
          <Route path="/lost-report" element={<LostItemReport />} />
          <Route path="/found-entry" element={<FoundItemEntry />} />
          <Route path="/found-report" element={<FoundItemReport />} />
          <Route path='/StudentList' element={<StudentList/>}/>
          <Route path='/chat-msg' element={<ChatMessage/>}/>
          <Route path='/profile' element={<ProfileMenu/>}/>
         
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;