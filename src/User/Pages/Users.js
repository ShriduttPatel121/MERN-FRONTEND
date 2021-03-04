import React, { useEffect, useState } from "react";
import { Typography, Button, CircularProgress } from '@material-ui/core';

import UsersList from "../Components/UsersList";
import ErrorModal from '../../Shared/UIElements/ErrorModal/ErrorModal';
import { useHttpClient } from '../../Shared/hooks/http-hook';

const Users = (props) => {
  const [USERS, setUSERS] = useState([]);
  const [errorModalVisibility, setErrorModalVisibility] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const closeErrorModal = () => {
    setErrorModalVisibility(false);
    clearError();
  }
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setUSERS(responseData.users);
      } catch (e) {
        setErrorModalVisibility(true);
      }
    }
    getAllUsers();
  }, [sendRequest]);
  
  return (
     <React.Fragment>
      <ErrorModal
        open={errorModalVisibility}
        onCloseModal={closeErrorModal}
        title='ERROR!!'
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
      { !isLoading ? <UsersList items={USERS} /> : <CircularProgress size={30}/>} 
    </React.Fragment>
  
  )};
export default Users;

/* USERS = [
    {
      id: "u1",
      name: "Shridutt",
      places: 4,
      image : 'blue_person.jpeg'
    },
    {
        id: "u2",
        name: "Narendra",
        places: 10,
        image : 'blue_person.jpeg'
    },
    {
        id: "u3",
        name: "Udayprabha",
        places: 12,
        image : 'blue_person.jpeg'
    },
    {
        id: "u4",
        name: "Dushyant",
        places: 12,
        image : 'blue_person.jpeg'
    },
    {
      id: "u5",
      name: "Dushyant",
      places: 12,
      image : 'blue_person.jpeg'
    },
    {
      id: "u6",
      name: "Udayprabha",
      places: 12,
      image : 'blue_person.jpeg'
    },
    {
      id: "u7",
      name: "Narendra",
      places: 10,
      image : 'blue_person.jpeg'
    },
    {
      id: "u8",
      name: "Shridutt",
      places: 4,
      image : 'blue_person.jpeg'
    },
  ]; */