import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { lowerCaseAndRemoveSpace } from "../../utils/lowerCaseAndRemoveSpaceUtils";
import httpMethod from "../../utils/httpUtils";

import style from "./SubmitForm.module.css";

const submitSchema = Yup.object().shape({
  givenName: Yup.string()
    .required("Required"),
  surName: Yup.string()
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(7, 'Too Short !')
    .max(13, 'Too Long !')
    .required("Requiered"),
  addressLine: Yup.string()
    .required("Required"),
  suburb: Yup.string()
    .required("Required"),
  state: Yup.string()
    .required("Required"),
  postCode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Required"),
  country: Yup.string()
    .required("Required")
});

interface SubmitFormProps {
  setOpen: Function,
  updateId?: number,
  updateResult?: any,
  setReferrals: Function
}

interface InputProps {
  index: number,
  item: string
}



const SubmitForm = ({ setOpen, updateId, updateResult, setReferrals }: SubmitFormProps) => {
  const { givenName, surName, email, phone, addressLine, suburb, state, postCode, country } = updateResult;
  const initialValues = {
    givenName: givenName || "",
    surName: surName || "",
    email: email || "",
    phone: phone || "",
    addressLine: addressLine || "",
    suburb: suburb || "",
    state: state || "",
    postCode: postCode || "",
    country: country || ""
  }

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    if (updateId === 0) {
      await httpMethod.create(values);
    } else {
      await httpMethod.update(updateId, values)
    }
    const result = await httpMethod.get();
    setReferrals(result);
    setSubmitting(false);
    setOpen(false);
  };

  const handleCancelBtn = () => {
    setOpen(false)
  };

  const feildsArr = ["Given Name", "Surname", "Email", "Phone", "Address Line", "Suburb", "State", "Post Code", "Country"]
  const inputFeildsArr = lowerCaseAndRemoveSpace(feildsArr);

  const Input= ({ item, index }: InputProps) => (
    <div className={style.submit__form_input} >
      <label>
        <p>{feildsArr[index]}:</p>
        <div>
          <Field type="text" name={item} id={item} />
        </div>
        <div
          className={style.submit__form_error}
          data-testid="submit-form-error"
        >
          <ErrorMessage
            name={item}
            component="div"
            data-testid={`${item}-error`}
          />
        </div>
      </label>
    </div>
  )

  return (
    <div className={style.submit}>
      <Formik
        initialValues={initialValues}
        validationSchema={submitSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <div className={style.submit__form}>
              <Form>
                {
                  inputFeildsArr.map((item, index) => (
                    <Input item={item} index={index} key={index} />
                  ))
                }
                <div className={style.submit__form__btn_submit}>
                  <button type="submit" disabled={isSubmitting}>
                    {updateId === 0 ? "Create" : "Save"}
                  </button>
                </div>
              </Form>
              <div className={style.submit__form__btn_cancel}>
                <button onClick={handleCancelBtn}>Cancel</button>
              </div>
            </div>
          );
        }}
      </Formik >
    </div >

  );
};

export default SubmitForm;
