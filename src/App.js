import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./contexts/AuthProvider";
import AppProvider from "./contexts/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMembersModals from "./components/Modals/InviteMembersModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
          </Routes>
          <AddRoomModal />
          <InviteMembersModals />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
