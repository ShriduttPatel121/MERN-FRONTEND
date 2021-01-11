import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Collapse,
  IconButton,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import {
  Edit,
  RoomOutlined,
  DeleteRounded,
  ExpandMoreRounded,
} from "@material-ui/icons";
import Modal from "../../Shared/UIElements/Modal/Modal";
import Map from "../../Shared/UIElements/Map/Map";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
    marginTop: "2rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actionArea: {
    padding: "8px 16px",
  },
  deleteBtn : {
    backgroundColor : '#f23030',
    color : 'white',
    '&:hover' : {
      backgroundColor : '#c92424'
    }
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
const PlaceItem = (props) => {
  console.log(props);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [locationModalVisibility, setLocationModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const openLocationModal = () => {
    setLocationModalVisibility(true);
  };

  const openDeleteModal = () => {
    setDeleteModalVisibility(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisibility(false);
  };

  const closeLocationModal = () => {
    setLocationModalVisibility(false);
  };

  const editPlaceHandler = () => {
    history.push(`/place/${props.id}`);
  };

  return (
    <React.Fragment>
      <Modal
        open={locationModalVisibility}
        onOpenModal={openLocationModal}
        onCloseModal={closeLocationModal}
        title={props.title}
        actions={
          <Button
            variant="contained"
            color="primary"
            onClick={closeLocationModal}
          >
            CLOSE
          </Button>
        }
      >
        <Map zoom={10} center={props.coordinate} />
      </Modal>
      <Modal
        open={deleteModalVisibility}
        onOpenModal={openDeleteModal}
        onCloseModal={closeDeleteModal}
        title="Warning!!!"
        actions={
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              onClick={closeDeleteModal}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              onClick={closeDeleteModal}
              className={classes.deleteBtn}
            >
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <Typography variant="h5" component="h2" style={{margin : '1rem 24px'}}>
          Do you want to proceed and delete this place? Please note that it can't be undone thereafter.
      </Typography>
      </Modal>
      <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="switzerland"
          src="data:image/jpeg;base64,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"
        />
        <CardContent className={classes.actionArea}>
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.address}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={openLocationModal}>
            <RoomOutlined />
          </IconButton>
          <IconButton onClick={editPlaceHandler}>
            <Edit />
          </IconButton>
          <IconButton onClick={openDeleteModal}>
            <DeleteRounded />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ExpandMoreRounded />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{props.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  );
};
export default PlaceItem;
