import React from 'react';
import Modal from '@material-ui/core/Modal';

import { SubmitForm } from '../SubmitForm';

interface SimpleModalProps {
  open: boolean;
  updateId: number;
  setOpen: Function;
  setReferrals: Function;
  updateResult?: any;
}

const SimpleModal = ({ open, setOpen, updateId, updateResult, setReferrals }: SimpleModalProps) => {
  return (
    <Modal open={open} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      <div style={{ height: '100%', overflow: 'auto'}}>
        <SubmitForm setOpen={setOpen} updateId={updateId} updateResult={updateResult} setReferrals={setReferrals} />
      </div>
    </Modal>
  );
};

export default SimpleModal;
