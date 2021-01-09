import React, { forwardRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";

import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles( (theme) => ({
  root : {
    '& .MuiDialog-paperWidthSm' : {
      maxWidth : '70vw',
    },
    '& .MuiDialogTitle-root' : {
      backgroundColor : theme.palette.primary.main,
      color : 'white'
    },
    '& .MuiDialogContent-root' : {
      padding : 0
    }
  },
  actions : {
    padding : '10px'
  }
}))

const Transition = forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const Modal = (props) => {
  const classes = useStyle();
  let { open, onCloseModal, title, children, actions } = props;
  return (
      <Dialog 
      open={open}
      TransitionComponent={Transition}
      onClose={onCloseModal}
      className={classes.root}
      >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions className={classes.actions}>
              {actions}
          </DialogActions>
      </Dialog>
  );
};
export default Modal;
