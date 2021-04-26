import React, { useState, useContext } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Collapse,
  IconButton,
  Button,
  CircularProgress,
  Box,
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
import ErrorModal from "../../Shared/UIElements/ErrorModal/ErrorModal";
import { AuthContext } from "../../Shared/context/auth-context";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../Shared/hooks/http-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
    marginTop: "2rem",
  },
  media: {
    height: '400px'
  },
  actionArea: {
    padding: "8px 16px",
  },
  deleteBtn: {
    backgroundColor: "#f23030",
    color: "white",
    "&:hover": {
      backgroundColor: "#c92424",
    },
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
  const { id: placeId, onDelete } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [locationModalVisibility, setLocationModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [errorModalVisibility, setErrorModalVisibility] = useState(false);
  const history = useHistory();
  const { isLoading, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);

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

  const errorModalClose = () => {
    setErrorModalVisibility(false);
  };

  /* const errorModalOpen = () => {
    setErrorModalVisibility(true);
  }; */

  const editPlaceHandler = () => {
    history.push(`/place/${placeId}`);
  };

  const deletePlaceHandler = async () => {
    try {
      setDeleteModalVisibility(false);
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}places/${placeId}`, "DELETE", null, {
        "Content-type": "application/json",
        "Authorization": auth.token
      });
      await onDelete(placeId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal
        open={errorModalVisibility}
        onCloseModal={errorModalClose}
        title="Could not delete the place."
        actions={
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={errorModalClose}
            >
              OK
            </Button>
          </>
        }
      ></ErrorModal>
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
              onClick={deletePlaceHandler}
              className={classes.deleteBtn}
            >
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <Typography variant="h5" component="h2" style={{ margin: "1rem 24px" }}>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </Typography>
      </Modal>
      {isLoading ? (
        <Box
          display="flex"
          height="100vh"
          justifyContent="center"
          alignItems="center"
          position="fixed"
        >
          <CircularProgress size={70} />
        </Box>
      ) : null}
      <Card className={classes.root}>
        <CardMedia
        className={classes.media}
          component="img"
          alt="switzerland"
          src={`${process.env.REACT_APP_ASSETS_URL}${props.image}`}
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
          {auth.userId === props.creatorId ? (
            <React.Fragment>
              {" "}
              <IconButton onClick={editPlaceHandler}>
                <Edit />
              </IconButton>
              <IconButton onClick={openDeleteModal}>
                <DeleteRounded />
              </IconButton>
            </React.Fragment>
          ) : null}
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
