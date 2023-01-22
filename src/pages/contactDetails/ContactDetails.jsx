import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { Axios } from "../../utils/axiox";
import "./ContactDetails.css";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState("");
  useEffect(() => {
    // make api call here
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      setLoading(true)
      const { data } = await Axios.get(`/contact/${id}`);
      setData(data);
      setLoading(false);
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Sorry Something went wrong";
      setLoading(false);
      toast.error(msg);
      setError(msg);
    }
  };
  const sendMessage = () => {
    navigate("send-message", { state: data });
  };
  return (
    <div className="detailsDiv">
      {!isError.length ? (
        <div className="detailsParent">
          <p className="contactDetailsHeading">Contact Details</p>
          {!isLoading ? (
            <div className="detailsCard">
              {Object.keys(data).length ? (
                <div>
                  <div className="nameAvatar">
                    <div className="avatar">
                      {data.name.first[0]} {data.name.last[0]}
                    </div>

                    <h1>
                      {data.name.first} {data.name.last}
                    </h1>
                  </div>
                  <div className="phoneDiv">
                    <p>Phone Number {data.phoneNumber}</p>
                    <button onClick={sendMessage}>Send Message</button>
                  </div>
                </div>
              ) : (
                <p>Sorry Contact does not exist</p>
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      ) : (
        <div>
          <p>Error is {isError} </p>
        </div>
      )}
    </div>
  );
}

export default ContactDetails;
