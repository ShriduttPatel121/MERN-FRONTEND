import React, { useEffect, useState } from 'react';
import PlaceList from '../Components/PlaceList';
import { useParams } from 'react-router-dom';
import { Typography, Button, CircularProgress } from '@material-ui/core';

import { useHttpClient } from '../../Shared/hooks/http-hook';
import ErrorModal from '../../Shared/UIElements/ErrorModal/ErrorModal';
import { endpoints } from '../../environment/endpoints';


const UserPlaces = (props) =>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [errorModalVisibility, setErrorModalVisibility] = useState(false);
    const [places, setPlaces] = useState([]);
    const id = useParams().userId;
    const closeModalHandler = () => {
        setErrorModalVisibility(false);
        clearError();
      }

      const onDeletePlace = async (placeId) => {
        //const responseData = await sendRequest(endpoints.places+ '/user'+ id);
        //setPlaces(responseData.places);
        setPlaces( (prePlaces) => {
          return prePlaces.filter(p => p.id !== placeId);
       })
      }

      useEffect(() => {
        const getPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${id}`);
                setPlaces(responseData.places);
            } catch(e) {
                setErrorModalVisibility(true);
            }
        }
        getPlaces();
      }, [sendRequest, id]);
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
        { isLoading && (
            <div style={{height : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                <CircularProgress size={50}/>
            </div>
        ) }
        { !isLoading && places && <PlaceList onDeletePlace={onDeletePlace} items={places}/> }
        </React.Fragment>
    );
};
export default UserPlaces;
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