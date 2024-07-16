import { Field, Form, Formik } from "formik";
import { FormBtn } from "FormToDo/FormToDo.styled";
import { useDispatch } from "react-redux";
import { register } from "../redux/oparations";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1>sign up</h1>
      <Formik
        initialValues={{
          "email": "",
          "password": "",
          "username": "",
        }}
        //   validationSchema={schemaValidation}
        onSubmit={(values, { resetForm }) => {
          resetForm({ email: "", password: "", userName: "" });
          console.log(values)
          dispatch(register(values));
        }}
      >
        <Form>
          <Field name="email" placeholder="user@example.com" type="email" />
          <Field name="password" type="password" placeholder="password" />
          <Field name="username" type="text" placeholder="user name" />
          <FormBtn type="submit">submit</FormBtn>
        </Form>
      </Formik>
    </>
  );
};
