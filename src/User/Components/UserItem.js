import { Typography, Card, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import React from 'react';
import './UserItem.css';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root : {
        margin : '1rem',
        maxWidth : '45%',
        '& a' : {
            textDecoration : 'none',
            color : 'inherit'
        },
        '& img': {
            height: '250px'
        }
    }
})
const Useritem =  (props) =>{
    const classes = useStyles();

    return(
        <Card className={classes.root}>
        <Link to={`/${props.id}/places`}>
            <CardActionArea>
                {/* <CardMedia image={require(`../../assets/images/${props.image}`)} component="img" alt="A person"/> */}
                <CardMedia image={props.image} component="img" alt="A person"/>
                <CardContent>
                    <Typography variant="h5" component="h2">{props.name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{props.placeCount} { props.placeCount === 1 || 0 ? 'Place' : 'Places'}</Typography>
                </CardContent>
            </CardActionArea>
            </Link>
        </Card>
    );
};
export default Useritem;