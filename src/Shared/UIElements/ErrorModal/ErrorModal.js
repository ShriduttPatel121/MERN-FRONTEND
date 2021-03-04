import React from 'react';
import Modal from '../Modal/Modal';

const ErrorModal =  (props) =>{
    const { open, onCloseModal, children, actions, title } = props;
    return(
        <Modal
            open={open}
            onCloseModal={onCloseModal}
            actions={actions}
            title={title}
        >
        {children}
        </Modal>
    );
};
export default ErrorModal;