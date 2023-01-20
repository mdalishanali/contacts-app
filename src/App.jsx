import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import ContactDetails from "./pages/contactDetails/ContactDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<ContactDetails />} />
    </Routes>
  );
}

export default App;
