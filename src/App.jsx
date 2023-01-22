import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import ContactDetails from "./pages/contactDetails/ContactDetails";
import Message from "./pages/message/Message";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<ContactDetails />} />
      <Route path="/:id/send-message" element={<Message />} />
    </Routes>
  )
}

export default App;
