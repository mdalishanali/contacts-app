import { Field, useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { Axios } from "../../utils/axiox";
import { contactValidation } from "../../utils/contactValidation";
import "./createContact.css";
export default function CreateContact() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    name: {
      first: "",
      last: "",
    },
    phoneNumber: "+91",
  };

  const onSubmit = async (values, actions) => {
    try {
      setLoading(true);
      console.log("values: ", values);
      const { data } = await Axios.post("/contact", values);
      toast.success("Contact Created Successfully");
      setLoading(false);
      navigate("/");
      actions.resetForm();
    } catch (error) {
      console.log("error: ", error);
      const msg =
        error?.response?.data?.message || "Sorry Something went wrong";
      setLoading(false);
      toast.error(msg);
      setError(msg);
    }

    setTimeout(() => {
      actions.setSubmitting(false);
    }, 500);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: contactValidation,
  });

  return (
    <div className="createContact">
      {!isLoading ? (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <input
              placeholder="First Name"
              type="text"
              className="inputStyle"
              onBlur={formik.handleBlur}
              name="name.first"
              value={formik.values.name?.first}
              onChange={formik.handleChange}
              style={{
                borderColor:
                  formik.touched.name?.first && formik.errors.name?.first
                    ? "red"
                    : "",
              }}
            />
            <p>
              {formik.touched.name?.first && formik.touched.name?.first
                ? formik.errors.name?.first
                : ""}
            </p>
            <br />
            <input
              placeholder="Last Name"
              type="text"
              className="inputStyle"
              onBlur={formik.handleBlur}
              name="name.last"
              value={formik.values.name.last}
              onChange={formik.handleChange}
              style={{
                borderColor:
                  formik.touched.name?.last && formik.errors.name?.last
                    ? "red"
                    : "",
              }}
              error={
                formik.touched.name?.last && formik.errors.name?.last
                  ? true
                  : false
              }
            />
            <p>
              {formik.touched.name?.last && formik.touched.name?.last
                ? formik.errors.name?.last
                : ""}
            </p>
            <br />
            <input
              placeholder="Phone Number"
              type="text"
              className="inputStyle"
              onBlur={formik.handleBlur}
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              style={{
                borderColor:
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "red"
                    : "",
              }}
              error={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? true
                  : false
              }
            />
            <p>
              {formik.touched.phoneNumber && formik.touched.phoneNumber
                ? formik.errors.phoneNumber
                : null}
            </p>
            <br />
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="createContactBtn"
            >
              Create Contact
            </button>
          </form>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
      <p>{isError ? isError : ""}</p>
    </div>
  );
}
