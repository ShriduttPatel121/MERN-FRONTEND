import { Container, Typography } from "@material-ui/core";
import React from "react";
import "./UsersList.css";
import Useritem from "./UserItem";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root : {
        alignItems : 'center',
        justifyContent : 'space-around',
        display : 'flex',
        width : '70%',
        padding : '0.5rem',
        flexWrap : 'wrap',
        height : '100%'
    }
});
const UsersList = (props) => {
    const classes = useStyles();
  if (props.items.length === 0) {
    return (
      <Container className={classes.root} maxWidth="md">
        <Typography
          variant="h5"
          component="h2"
        >
          No user available.
        </Typography>
      </Container>
    );
  } else {
    return (
      <Container className={classes.root} maxWidth="md">
        {props.items.map((user) => {
          return (
                <Useritem 
                    key={user.id} 
                    id={user.id} 
                    image={user.image} 
                    name={user.name} 
                    placeCount={user.places}/>
          );
        })}
      </Container>
    );
  }
};
export default UsersList;
