import React, { useState } from 'react';
import { Button, Dialog, CircularProgress, makeStyles } from '@material-ui/core';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';
import UploadForm from './UploadForm';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(8),
    backgroundColor: '#fff'
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const UploadButton = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileSelected = (files) => {
    // Обработка загрузки файла
    console.log("Files selected: ", files);
    setIsLoading(true);
    const formData = new FormData();
    formData.append('photo', files[0]);
    axios.post('http://localhost:5000/add_photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Search results:', response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error during search by photo:', error);
        setIsLoading(false);
      });
    // Закрываем форму после начала загрузки
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleOpen}
        startIcon={<AddPhotoIcon />}
        disabled={isLoading}
      >
        Загрузить фотографию
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <UploadForm onFileSelected={handleFileSelected} isLoading={isLoading} />
      </Dialog>
    </>
  );
};

export default UploadButton;
