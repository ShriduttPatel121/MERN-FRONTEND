import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PlaceItem from "./PlaceItem";

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

const PlaceList = (props) => {
  const classes = useStyles();
  if (props.items.length === 0) {
    return (
      <Container className={classes.root} maxWidth="md">
        <Typography variant="h5" component="h2">
          No user available.
        </Typography>
      </Container>
    );
  } else {
    return (
      <Container className={classes.root} maxWidth="md">
        {props.items.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creatorId}
            coordinate={place.location}
          />
        ))}
      </Container>
    );
  }
};
export default PlaceList;
