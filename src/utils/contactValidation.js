import * as Yup from "yup";

export const contactValidation = Yup.object().shape({
  name: Yup.object().shape({
    first: Yup.string().required("Please enter first name"),
    last: Yup.string().required("Please enter last name"),
  }),
  phoneNumber: Yup.string().required("Required"),
});
