import React, { useRef, useEffect, useState } from 'react';
import './ImageUpload.css'
import {
    Button
} from '@material-ui/core';
import { useField } from "formik";
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { CameraAltOutlined } from '@material-ui/icons'

const useStyle = makeStyles((theme) => ({
    large: {
        width: theme.spacing(18),
        height: theme.spacing(18)
    },
    place_image : {
        width: '25rem',
        height: '20rem'
    }
}));
const ImageUpload = (props) => {
    const classes = useStyle();
    const inputRef = useRef();
    const { sigupImage } = props
    const [field, meta] = useField(props);
    const pickImageHandler = () => {
        inputRef.current.click();
    }
    const [image, setImage] = useState(null)
    useEffect(() => {
        if(!field.value ){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImage(fileReader.result);
        }
        fileReader.readAsDataURL(field.value);
    }, [field.value]);

    return (
        <div>
            <input  name={props.name} onChange={props.onChange} ref={inputRef} type="file" id={props.id} accept=".jpeg,.jpg,.png" style={{display: 'none'}}>

            </input>
            
            <div className={`iamge-upload`}>
                <div className={sigupImage ? "image-upload__preview" : "Place-image"} >
                    {image? <Avatar onClick={pickImageHandler} className={sigupImage ? classes.large : classes.place_image} sizes="40" src={image} alt="Preview"/> : <Avatar onClick={pickImageHandler} className={sigupImage ? classes.large : classes.place_image}> <CameraAltOutlined style={{ fontSize: 60 }}/> </Avatar>}
                </div>
                
            </div>
            {
                meta.error && meta.touched? (
                    <div className="error">
                    { meta.error }
                    </div>
                ) : null
            }
            <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
        </div>
    );
}

export default ImageUpload;
