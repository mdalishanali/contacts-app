import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Axios } from "../utils/axiox";
import Loader from "./Loader";
import "./contacts.css";
export default function ContactsMenu() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState("");
  useEffect(() => {
    getAllContacts();
  }, []);
  const createContacts = async () => {
    const payload = {
      name: {
        first: "Shyam",
        last: "Prasad",
      },
      phoneNumber: "+916391417248",
    };
    const { data } = await Axios.post("/contact", payload);
    console.log("data: ", data);
  };

  const getAllContacts = async () => {
    try {
      // const pagination = {
      //   page: 1,
      //   size: 10,
      // };
      const { data } = await Axios.get("/contact");
      const { contacts } = data;
      setContacts(contacts);
      setLoading(false);
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Sorry Something went wrong";
      setLoading(false);
      toast.error(msg);
      setError(msg);
    }
  };
  return (
    <div className="contacts-container">
      <h1 className="contactHeading">Contacts</h1>
      <div className="createContactDiv">
        <Link to="/create">
          <button className="createContactBtn">
            <p>Create Contact</p>
          </button>
        </Link>
      </div>
      {!isLoading ? (
        <div>
          {contacts.length ? (
            contacts.map((item) => {
              return (
                <Link
                  key={item._id}
                  to={`details/${item._id}`}
                  className="link"
                >
                  <div className="contact">
                    <div className="avatar">
                      {item.name.first[0]} {item.name.last[0]}
                    </div>
                    <div className="nameContainer">
                      <p>
                        {item.name.first} {item.name.last}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>{isError.length ? isError : "No Contacts exist"}</p>
          )}
        </div>
      ) : (
        <div className="contactsLoader">
          <Loader />
        </div>
      )}
    </div>
  );
}
