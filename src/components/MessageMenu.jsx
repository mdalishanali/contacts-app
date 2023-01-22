import moment from "moment/moment";
import React from "react";
import { useEffect, useState } from "react";
import { Axios } from "../utils/axiox";
import Loader from "./Loader";
import "./messageMenu.css";
export default function MessageMenu() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState("");
  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    try {
      // const pagination = {
      //   page: 1,
      //   size: 10,
      // };
      const { data } = await Axios.get("/message");
      const { counts, messages } = data;
      setMessages(messages);
      setLoading(false);
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Sorry Something went wrong";
      setLoading(false);
      setError(msg);
      toast.error(msg);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("llll");
  };

  return (
    <div className="messageBox">
      <div className="headerBox">
        <h1>All Messages</h1>
      </div>
      {!isError.length ? (
        <div className="messageContentParent">
          {!isLoading ? (
            <div className="messageConent">
              {messages.length ? (
                messages.map((item) => {
                  return (
                    <div key={item._id} className="singleMessage">
                      <p className="userName">
                        {item?.userId?.name?.first} {item?.userId?.name?.last}
                      </p>
                      <p className="otp">The otp is {item.otp}</p>
                      <p>{formatDate(item.createdAt)}</p>
                    </div>
                  );
                })
              ) : (
                <p>Sorry! No message had been sent yet!</p>
              )}
            </div>
          ) : (
            <div className="loaderDiv">
              <Loader />
            </div>
          )}
        </div>
      ) : (
        <div>There is some error</div>
      )}
    </div>
  );
}
