import React, { useRef, useEffect, useState } from 'react';
import './ImageUpload.css'
import {
    Button
} from '@material-ui/core';
import { useField } from "formik";
const ImageUpload = (props) => {
    
    const inputRef = useRef();
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
            console.log(fileReader.result)
            setImage(fileReader.result);
        }
        fileReader.readAsDataURL(field.value);
    }, [field.value]);

    return (
        <div>
            <input  name={props.name} onChange={props.onChange} ref={inputRef} type="file" id={props.id} accept=".jpeg,.jpg,.png" style={{display: 'none'}}>

            </input>
            {
                meta.error && meta.touched? (
                    <div className="error">
                    { meta.error }
                    </div>
                ) : null
            }
            <div className={`iamge-upload`}>
                <div>
                    {image? <img src={image} alt="Preview"/> : <p>Please pick an image</p>}
                </div>
                
            </div>
            <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
        </div>
    );
}

export default ImageUpload;
