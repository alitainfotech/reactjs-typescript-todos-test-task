import React from "react";
import styles from "../../styles/pages/login.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { STRING } from "../../controller/string";
import { InputField } from "../../components/inputField/inputField";
import { LoginFormValues } from "../../interface/interface";

interface LoginProps {
  onLogin: (username: string, password: string) => Object;
}
const Login = ({ onLogin }: LoginProps): JSX.Element => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values: LoginFormValues) => {
    let res: any = onLogin(values.email, values.password);
    localStorage.setItem("AUTH_TOKEN", JSON.stringify(res.token));
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>{STRING.LOGIN}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <InputField
                label="Email"
                name="email"
                placeholder="Enter Email"
                type="text"
              />
              <InputField
                label="Password"
                name="password"
                placeholder="********"
                type="password"
              />
            </div>

            <button className={styles.submitButton} type="submit">
              {STRING.LOGIN}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
