import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import httpMethod from '../../utils/httpUtils';

interface DeleteAlertProps {
  open: boolean;
  deleteId: number;
  setOpen: Function;
  setReferrals: Function;
}

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center',
      borderRadius: '3px'
    },
  })
);

const DeleteAlert = ({ open, deleteId, setOpen, setReferrals }: DeleteAlertProps) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await httpMethod.delete(deleteId);
    const result = await httpMethod.get();
    setReferrals(result);
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">Are you sure to Detele this referral ?</p>
      <Button onClick={handleDelete} color="primary">
        Delete
      </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
        Cancel
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default DeleteAlert;
