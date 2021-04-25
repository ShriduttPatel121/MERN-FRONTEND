import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Typography,
  Button,
  Container,
  Card,
  CircularProgress,
} from "@material-ui/core";
import * as Yup from "yup";

import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import TextInput from "../../Shared/UIElements/Input/TextInput";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { AuthContext } from "../../Shared/context/auth-context";
import ErrorModal from "../../Shared/UIElements/ErrorModal/ErrorModal";
import ImageUpload from "../../Shared/Components/ImageUpload/ImageUpload";

let initialValues = {
  title: "",
  address: "",
  description: "",
  image: undefined,
};
const FILE_SIZE = 5 * 1048576;
let validationSchema = {
  title: Yup.string()
    .min(5, "minimum 5 characters or more")
    .max(20, "maximum 20 characters or less")
    .required(),
  address: Yup.string()
    .min(10, "minimum 10 characters or more")
    .max(100, "maximum 100 characters or less")
    .required(),
  description: Yup.string()
    .min(10, "minimum 10 characters or more")
    .max(100, "maximum 100 characters or less")
    .required(),
  image: Yup.mixed()
    .required("image is required.")
    .test(
      "fileSize",
      "file is too large, it should be less than 5MB",
      (value) => {
        return value && value.size <= FILE_SIZE;
      }
    ),
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
    width: "35rem",
  },

  sybmitBtn: {
    marginTop: "1rem",
  },
});

const PlaceForm = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const classes = useStyles();
  const update = props.updateMode;
  let newPlaceForm = null;
  const { placeId } = useParams();
  const [errorModalVisibility, setErrorModalVisibility] = useState(false);
  const [updateInitialValues, setUpdateInitialValues] = useState({
    title: "",
    description: "",
  });

  const auth = useContext(AuthContext);
  const history = useHistory();

  const closeModalHandler = () => {
    setErrorModalVisibility(false);
    clearError();
  };

  useEffect(() => {
    const fillUpdateForm = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`,
          "GET",
          null,
          { "Content-Type": "application/json" }
        );
        //console.log(response);
        const palceData = {
          title: response.place.title,
          description: response.place.description,
        };
        setUpdateInitialValues(palceData);
      } catch (e) {
        setErrorModalVisibility(true);
      }
    };
    if (update) {
      fillUpdateForm();
    }
  }, [sendRequest, placeId, update]);

  if (props.updateMode === true) {
    console.log(placeId);
    newPlaceForm = (
      <React.Fragment>
        <TextInput type="text" name="title" label="Title" />
        <TextInput
          type="textarea"
          name="description"
          label="Description"
          isMultiline
        />
      </React.Fragment>
    );

    validationSchema = {
      title: Yup.string()
        .min(5, "minimum 5 characters or more")
        .max(40, "maximum 40 characters or less")
        .required(),
      description: Yup.string()
        .min(10, "minimum 10 characters or more")
        .max(100, "maximum 100 characters or less")
        .required(),
    };
  } else {
    newPlaceForm = (
      <React.Fragment>
        <TextInput type="text" name="title" label="Title" />
        <TextInput type="text" name="address" label="Address" />
        <TextInput
          type="textarea"
          name="description"
          label="Description"
          isMultiline
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal
        open={errorModalVisibility}
        onCloseModal={closeModalHandler}
        title="Error!!"
        actions={
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              onClick={closeModalHandler}
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
        initialValues={props.updateMode ? updateInitialValues : initialValues}
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={async (value, { setSubmitting, resetForm }) => {
          console.log(value);
          try {
            if (update) {
              await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                "PATCH",
                JSON.stringify({
                  title: value.title,
                  description: value.description,
                }),
                { 
                  "Content-Type": "application/json",
                  "Authorization": auth.token  
                }
              );
            } else {
              const formData = new FormData();
              formData.append("title", value.title);
              formData.append("address", value.address);
              formData.append("description", value.description);
              formData.append("image", value.image);
              await sendRequest(
                "http://localhost:5000/api/places",
                "POST",
                formData,
                { Authorization: auth.token }
              );
            }
            history.push("/");
          } catch (e) {
            setErrorModalVisibility(true);
          }
        }}
      >
        {(props) => {
          return (
            <Container className={classes.root} maxWidth="md">
              <Card className={classes.formContainer}>
                <Typography variant="h5" component="h2">
                  {update ? "Update the place" : "Add new place"}
                </Typography>
                <form onSubmit={props.handleSubmit}>
                  {newPlaceForm}
                  {!update ? (
                    <ImageUpload
                      name="image"
                      onChange={(event) => {
                        props.setFieldValue("image", event.target.files[0]);
                      }}
                    />
                  ) : null}
                  {!isLoading ? (
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      //disabled={!props.isValid || props.isSubmitting}
                      color="primary"
                      className={classes.sybmitBtn}
                    >
                      {update ? "Update" : "Save"}
                    </Button>
                  ) : (
                    <CircularProgress />
                  )}
                </form>
              </Card>
            </Container>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
export default PlaceForm;

/* const DUMMY_PLACE_LIST = [
  {
      id : 'p1',
      title : 'A popular Lake in Switzerland',
      description : 'This is the most famous lake in Switzerland, and this is the most beautiful lake in the world.',
      address : 'Rosenweg 20, Lachen, Unterbäch, 3944, Switzerland',
      location : {
          lat : 46.8182,
          lng : 8.2275
      },
      creator : 'u1'
  },

  {
      id : 'p2',
      title : 'A popular Lake in Switzerland',
      description : 'This is the most famous lake in Switzerland, and this is the most beautiful lake in the world.',
      address : 'Rosenweg 20, Lachen, Unterbäch, 3944, Switzerland',
      location : {
          lat : 46.8182,
          lng : 8.2275
      },
      creator : 'u2'
  },

  {
      id : 'p3',
      title : 'A popular Lake in Switzerland',
      description : 'This is the most famous lake in Switzerland, and this is the most beautiful lake in the world.',
      address : 'Rosenweg 20, Lachen, Unterbäch, 3944, Switzerland',
      location : {
          lat : 46.8182,
          lng : 8.2275
      },
      creator : 'u1'
  }
]; */
