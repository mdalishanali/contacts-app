import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import ContactDetails from "./pages/contactDetails/ContactDetails";
import Message from "./pages/message/Message";
import CreateContact from "./pages/createContact/CreateContact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="details/:id" element={<ContactDetails />} />
      <Route path="details/:id/send-message" element={<Message />} />
      <Route path="/create" element={<CreateContact />} />
    </Routes>
  );
}

export default App;
