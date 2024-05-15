// components/UploadDialog.js
import React from 'react';
import { Dialog, IconButton, makeStyles } from '@material-ui/core';
import UploadForm from './UploadForm';


const UploadDialog = ({ open, onClose }) => {
    return (
    <Dialog open={open} onClose={onClose}>
      <UploadForm />
    </Dialog>
  );
};

export default UploadDialog;
