import React, { useState, useContext } from "react";
import {
  Typography,
  Container,
  Card,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/styles";

import TextInput from "../../Shared/UIElements/Input/TextInput";
import { AuthContext } from "../../Shared/context/auth-context";
import ErrorModal from "../../Shared/UIElements/ErrorModal/ErrorModal";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ImageUpload from '../../Shared/Components/ImageUpload/ImageUpload';

let initialValues = {
  name: "",
  email: "",
  password: "",
  cnfPassword: "",
  userImage: undefined
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
    "@media(max-width : 52rem)": {
      width: "80%",
    },
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
  const [cnfPasswordVisibility, setCnfPasswordVisibility] = useState(
    "password"
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [mode, setMode] = useState("login");
  const [errorModalVisiblity, setErrorModalVisiblity] = useState(false);

  const switchModeHandler = () => {
    setMode((preState) => {
      if (preState === "login") {
        return "signup";
      } else {
        return "login";
      }
    });
  };
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
  };

  const closeErrorModal = () => {
    setErrorModalVisiblity(false);
    clearError(null);
  };
  let form = null;
  let validation = null;

  if (mode === "login") {
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

    validation = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(5, "min 5 characters or more"),
    });
  } else {
    const FILE_SIZE = 5 * 1048576;
    validation = Yup.object({
      email: Yup.string().email().required(),
      name: Yup.string().required().min(5, "min 5 characters or more"),
      password: Yup.string().required().min(5, "min 5 characters or more"),
      cnfPassword: Yup.string()
        .required("This field is required.")
        .oneOf([Yup.ref("password"), null], "Should match with above field"),
      userImage: Yup.mixed()
                    .required('Image is required.')
                    .test("fileSize", "file is too large, it should be less than 5MB", (value) => {
                      console.log(value && value.size <= FILE_SIZE);
                       return value && value.size <= FILE_SIZE; } 
                       )

    });
    form = (
      <React.Fragment>
        <TextInput type="text" name="name" label="Your Name" />
        <TextInput type="email" name="email" label="Email" />
        <TextInput
          type={passwordVisibility}
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
          label="Confirm password"
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal
        open={errorModalVisiblity}
        onCloseModal={closeErrorModal}
        title="Error!!"
        actions={
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              onClick={closeErrorModal}
            >
              OK
            </Button>
          </React.Fragment>
        }
      >
        <Typography
          variant="h5"
          component="h2"
          style={{ margin: "1rem 24px", minWidth: "20rem" }}
        >
          {error || "Somthing went wrong. Plase try again."}
        </Typography>
      </ErrorModal>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={async (value, { setSubmitting, resetForm }) => {
          resetForm(false);
          try {
            if (mode === "login") {
              const responseData = await sendRequest(
                "http://localhost:5000/api/users/login",
                "POST",
                JSON.stringify({
                  email: value.email,
                  password: value.password,
                }),
                {
                  "Content-Type": "application/json",
                }
              );
              auth.login(responseData.user._id);
            } else {
              const formData = new FormData();
              formData.append('email', value.email);
              formData.append('name', value.name);
              formData.append('password', value.password);
              formData.append('image', value.userImage);
              await sendRequest(
                "http://localhost:5000/api/users/signup",
                "POST",
                formData
              );
              setMode("login");
            }
          } catch (e) {
            console.log(e);
            setErrorModalVisiblity(true);
          }
        }}
      >
        {(props) => {
          return (
            <Container className={classes.root} maxWidth="md">
              <Card className={classes.formContainer}>
                <Typography component="h1" variant="h4">
                  {mode === "login" ? "Login" : "Signup"}
                </Typography>
                <Divider style={{ margin: "1rem 0" }} />
                <form onSubmit={props.handleSubmit}>
                { mode === "login" ? null: (
                    <ImageUpload 
                      id="user-image"
                      sigupImage
                      name="userImage"
                      onChange={(event) => {
                        props.setFieldValue("userImage", event.target.files[0])
                      }}
                    />
                  ) }
                  {form}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >                  
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        disabled={!props.isValid || props.isSubmitting}
                        color="primary"
                        className={classes.sybmitBtn}
                      >
                        {mode === "login" ? "Login" : "Signup"}
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="large"
                      color="primary"
                      variant="outlined"
                      style={{ marginTop: "1rem" }}
                      onClick={switchModeHandler}
                    >
                      Switch mode to {mode === "login" ? "Signup" : "Login"}
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
