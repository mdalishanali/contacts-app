import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import { Axios } from "../../utils/axiox";
import "./Message.css";
export default function Message() {
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const { _id, phoneNumber, fullName } = state;
  console.log("state: ", state);
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpMessage = `Your otp is ${otp} .`;
  const [message, setMessage] = useState(otpMessage);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const sendMessage = async () => {
    setLoading(true);
    try {
      const payload = {
        userId: _id,
        otp: otp,
        phoneNumber: phoneNumber,
      };
      const { data } = await Axios.post("/message", payload);
      toast.success(`Otp successfully sent to ${fullName}!`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const msg =
        error?.response?.data?.message || "Sorry Something went wrong";
      toast.error(msg);
    }
  };
  return (
    <div className="sendMessageContainer">
      <div className="messageContent">
        {!isLoading ? (
          <div>
            <p className="sendMessageP">Send otp to {fullName}</p>
            <p className="phoneNumber">Phone Number {phoneNumber}</p>
            <div className="inputWithBtn">
              <input type="text" onChange={handleChange} value={message} disabled />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <div className="loaderElem">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
