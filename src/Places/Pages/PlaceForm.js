import React from "react";
import { Formik } from "formik";
import { Typography, Button, Container, Card } from "@material-ui/core";
import * as Yup from "yup";
import TextInput from "../../Shared/UIElements/Input/TextInput";
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";

const DUMMY_PLACE_LIST = [
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
];

let initialValues = {
  title: "",
  address: "",
  description: "",
};

let updateInitialValues = {
  title: "",
  description: "",
};

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

  formContainer : {
      padding: "2rem 1rem",
      textAlign: "center",
      width: "25rem",
  },

  sybmitBtn: {
    marginTop: "1rem",
  },
});

const PlaceForm = (props) => {
  const classes = useStyles();
  const update = props.updateMode;
  let newPlaceForm = null;
  const placeId = useParams().placeId;
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
    
    
    updateInitialValues = DUMMY_PLACE_LIST.find(place => place.id === placeId);

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
        <TextInput type="text" name="address" label="Address"/>
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
      <Formik
        initialValues={props.updateMode ? updateInitialValues : initialValues}
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(value, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          resetForm(false);
          console.log(value);
        }}
      >
        {(props) => {
          return (
            <Container className={classes.root} maxWidth="md">
              <Card
                className={classes.formContainer}
              >
                <Typography variant="h5" component="h2">
                  { update? 'Update the place' : 'Add new place' }
                </Typography>
                <form onSubmit={props.handleSubmit}>
                  {newPlaceForm}
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={!props.isValid || props.isSubmitting}
                    color="primary"
                    className={classes.sybmitBtn}
                  >
                    {update ? 'Update' : 'Save'}
                  </Button>
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
