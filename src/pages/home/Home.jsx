import React from "react";
import ContactsMenu from "../../components/ContactsMenu";
import MessageMenu from "../../components/MessageMenu";

function Home() {
  return (
    <div>
      <ContactsMenu />
      <MessageMenu />
    </div>
  );
}

export default Home;
