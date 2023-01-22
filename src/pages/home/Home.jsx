import React from "react";
import ContactsMenu from "../../components/ContactsMenu";
import MessageMenu from "../../components/MessageMenu";

import "./index.css";
function Home() {
  return (
    <div className="container">
      <div className="contactMenu">
        <ContactsMenu />
      </div>
      <div className="messageMenu">
        <MessageMenu />
      </div>
    </div>
  );
}

export default Home;
