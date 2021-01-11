import React, { useState } from "react";
import { Typography, Container, Card, Button, Divider } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/styles";

import TextInput from "../../Shared/UIElements/Input/TextInput";

const initialValues = {
  email: "",
  password: "",
  name : "",
  cnfPassword : ""

};

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    justifyContent: "space-around",
    display: "flex",
    width: "70%",
    padding: "0.5rem",
    flexWrap: "wrap",
    height: "100%",
  },
  formContainer: {
    padding: "2rem 1rem",
    textAlign: "center",
    width: "25rem",
  },

  sybmitBtn: {
    marginTop: "1rem",
  },
});

const UserAuth = (props) => {
  const classes = useStyles();
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [cnfPasswordVisibility, setCnfPasswordVisibility] = useState("password");
  const [mode, setMode] = useState('login');

  const switchModeHandler = () => {
      setMode(preState => {
          if (mode === 'login') {
              return 'signup';
          } else {
              return 'login';
          }
      })
  }
  const passwordVisibilityHandler = () => {
    setPasswordVisibility((preState) => setVisibility(preState));
  };

  const cnfPasswordVisibilityHandler = () => {
    setCnfPasswordVisibility((preState) => setVisibility(preState));
  };

  const setVisibility = (type) => {
    if (type === "text") {
        return "password";
      } else {
        return "text";
      }
  }

  let form = null

  if (mode === 'login') {
      form = (
        <React.Fragment>
            <TextInput type="email" name="email" label="Email" />
            <TextInput
            type={passwordVisibility}
            name="password"
            visibilityicon="true"
            visiblilitytoggler={passwordVisibilityHandler}
            label="Password"
            />
        </React.Fragment>
      );
  } else {
      form = (
          <React.Fragment>
                <TextInput type="text" name="name" label="Your Name" />
                <TextInput type="email" name="email" label="Email" />
                <TextInput
                type={passwordVisibility || "password"}
                name="password"
                visibilityicon="true"
                visiblilitytoggler={passwordVisibilityHandler}
                label="Password"
                />
                <TextInput 
                    type={cnfPasswordVisibility || "password"}
                    name="cnfPassword"
                    visibilityicon="true"
                    visiblilitytoggler={cnfPasswordVisibilityHandler}
                    label="Password"
                />
          </React.Fragment>
      );
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          name: Yup.string().required().min(5, 'min 5 characters or more'),
          password: Yup.string().required().min(5, "min 5 characters or more"),
          cnfPassword : Yup.string().required().oneOf([Yup.ref('password'), null], "Should match with above field")
        })}
        onSubmit={(value, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            resetForm(false);
            console.log(value);
          }}
      >
        {(props) => {
          return (
            <Container className={classes.root} maxWidth="md">
              <Card className={classes.formContainer}>
                <Typography component="h1" variant="h4">
                  { mode === 'login' ? "Login" : "Signup" }
                </Typography>
                <Divider style={{margin : '1rem 0'}}/>
                <form onSubmit={props.handleSubmit}>
                  {form}
                  <div style={{display: 'flex', flexDirection : 'column', alignItems : 'center'}}>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={!props.isValid || props.isSubmitting}
                    color="primary"
                    className={classes.sybmitBtn}
                  >
                    { mode === 'login' ? "Login" : "Signup" }
                  </Button>
                  <Button
                    type="button"
                    size="large"
                    color="secondary"
                    variant="outlined"
                    style={{marginTop : '1rem'}}
                    onClick={switchModeHandler}
                  > 
                    Switch mode to { mode === 'login' ? "Signup" : "Login" }
                  </Button>
                  </div>
                </form>
              </Card>
            </Container>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
export default UserAuth;
