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
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
        overflow: 'hidden',
        border: '1px solid #cccc',
        height: '10rem',
        '& img': {
            /* objectFit: 'cover', */
            width: '100%',
            height: '100%',
        }
    }
}));
const ImageUpload = (props) => {
    const classes = useStyle();
    const inputRef = useRef();
    const { sigupImage } = props
    const [field, meta] = useField(props);
    const [isTouched, setIsTouched] = useState(false);

    const pickImageHandler = () => {
        inputRef.current.click();
        //setIsTouched(true);
    }
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        if(!field.value ){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImage(fileReader.result);
        }
        fileReader.readAsDataURL(field.value);
        setIsTouched(true);
    }, [field.value, setIsTouched]);

    return (
        <div>
            <input  name={props.name} onChange={props.onChange} ref={inputRef} type="file" id={props.id} accept=".jpeg,.jpg,.png" style={{display: 'none'}}>

            </input>
            
            <div className={`iamge-upload`}>
                {
                    sigupImage ? (
                        <div className={"image-upload__preview"} >
                            {image ? <Avatar onClick={pickImageHandler} className={classes.large} sizes="40" src={image} alt="Preview"/> : <Avatar onClick={pickImageHandler} className={sigupImage ? classes.large : classes.place_image}> <CameraAltOutlined style={{ fontSize: 60 }}/> </Avatar>}
                        </div>
                    ) : null
                }
                {
                    !sigupImage ? (
                        <div className={classes.place_image} onClick={pickImageHandler}>
                            {image ? <img onClick={pickImageHandler} sizes="40" src={image} alt="Preview"/> : <div style={{width: '100%', backgroundColor: '#ccccc'}}> <CameraAltOutlined style={{ fontSize: 60 }}/> </div>}
                        </div>
                    ): null
                }
                
            </div>
            {
                meta.error && isTouched ? (
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
