import React from "react";
import { Button, Card, Container, Typography } from "@material-ui/core";
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

const PlaceList = ({ onDeletePlace, ...props}) => {
  const classes = useStyles();
  if (props.items.length === 0) {
    return (
      <Container className={classes.root} maxWidth="md">
        <Card style={{padding : '3rem', textAlign : 'center'}}>
          <Typography variant="h5" component="h2">
            No places are available.
          </Typography>
          <Button variant="outlined" style={{marginTop : '0.85rem'}}>
            Share Places
          </Button>
        </Card>
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
            onDelete={onDeletePlace}
          />
        ))}
      </Container>
    );
  }
};
export default PlaceList;
