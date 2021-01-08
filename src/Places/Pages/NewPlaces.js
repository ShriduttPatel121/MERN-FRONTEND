import React from 'react';
import { Formik } from 'formik';
import { Typography, Button, Container, Card } from '@material-ui/core';
import * as Yup from 'yup';
import TextInput from '../../Shared/UIElements/Input/TextInput';
import { makeStyles } from "@material-ui/styles";

const initialValues = {
    title : "",
    description : ""
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
  });

const NewPlaces =  (props) =>{

    const classes = useStyles();

    const newPlaceForm = (
        <React.Fragment>
            <TextInput type="text" name="title" label="Title"/>
            <TextInput type="textarea" name="description" label="Description" isMultiline/>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={
                    Yup.object({
                        title : Yup.string()
                                .min(5, 'minimum 5 characters or more')
                                .max(20, 'maximum 20 characters or less')
                                .required(),
                        description : Yup.string()
                                .min(10, 'minimum 10 characters or more')
                                .max(100, 'maximum 100 characters or less')
                                .required()
                    })
                }
                onSubmit ={(value, { setSubmitting, resetForm }) => {
                    setSubmitting(false);
                    resetForm(false);
                    console.log(value);
                }}
            >
            { (props) => {
                return (
                    <Container className={classes.root} maxWidth="md">
                        <Card style={{padding : '3rem', textAlign : 'center'}}>
                        <Typography variant="h5" component="h2">Add new place</Typography>
                            <form onSubmit={props.handleSubmit}>
                                {newPlaceForm}
                                <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                disabled={!props.isValid || props.isSubmitting}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Card>
                    </Container>
                )
            }}
            </Formik>
        </React.Fragment>
    );
};
export default NewPlaces;