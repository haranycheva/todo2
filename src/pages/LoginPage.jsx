import { Field, Formik } from "formik";
import { FormBtn } from "FormToDo/FormToDo.styled";
import { Form } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/oparations";

export const LoginPage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1>login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        //   validationSchema={schemaValidation}
        onSubmit={(values, { resetForm }) => {
          dispatch(login(values));
          resetForm({ email: null, password: null });
        }}
      >
        <Form>
          <Field name="email" placeholder="user@example.com" type="email" />
          <Field name="password" type="password" placeholder="password" />
          <FormBtn type="submit">submit</FormBtn>
        </Form>
      </Formik>
    </>
  );
};
