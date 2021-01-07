import React, { useState, forwardRef } from "react";
import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";

const Transition = forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const Modal = (props) => {

  let { open, onCloseModal, title } = props;
  return (
      <Dialog 
      open={open}
      TransitionComponent={Transition}
      onClose={onCloseModal}
      >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>Here we will render the map, TODAY</DialogContent>
          <DialogActions>
              <Button onClick={onCloseModal}>CLOSE</Button>
          </DialogActions>
      </Dialog>
  );
};
export default Modal;
