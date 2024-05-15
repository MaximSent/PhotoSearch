// components/UploadForm.js
import React from 'react';
import { makeStyles, Paper, Typography, CircularProgress } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4), 
    border: '2px dashed #ccc',
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    margin: theme.spacing(4), 
  },
  icon: {
    fontSize: 64,
  },
  text: {
    marginTop: theme.spacing(2),
    fontSize: '1.25rem',
  },
}));

const UploadForm = ({ onFileSelected, isLoading }) => {
  const classes = useStyles();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onFileSelected,
  });

  return (
    <Paper className={classes.root} {...getRootProps()}>
      {isLoading ? (
        <CircularProgress size={64} />
      ) : (
        <>
          <CloudUploadIcon className={classes.icon} />
          <input {...getInputProps()} />
          <Typography className={classes.text}>Перетащите изображение сюда или нажмите для выбора файла</Typography>
        </>
      )}
    </Paper>
  );
};

export default UploadForm;
