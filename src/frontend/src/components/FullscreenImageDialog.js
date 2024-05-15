import React from 'react';
import { Dialog, IconButton, Grid, Button, Box } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  imageMain: {
    width: '100%',
    maxHeight: '90vh'
  },
  imageList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflowY: 'auto',
    maxHeight: '90vh',
    margin: theme.spacing(1),
  },
  imageItem: {
    margin: theme.spacing(1),
    cursor: 'pointer',
    maxWidth: '200px',
    margin:'20px',
    '&:hover': {
      opacity: 0.8
    }
  },
  downloadButton: {
    margin: theme.spacing(1),
  }
}));

const FullscreenImageDialog = ({ image, open, onClose, similarImages }) => {
  const classes = useStyles();
  const imageFilename = image ? image.split('/').pop() : '';
  const imageUrl = `http://localhost:5000/images/${imageFilename}`;

  
  return (
    <Dialog open={open} onClose={onClose} sx={{padding:'20px'}}>
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center',margin:'20px'}}>
        <Box sx={{maxWidth: '100%', maxHeight: '90vh',margin:'20px'}}>
          <img
            src={imageUrl}
            alt="Full View"
            className={classes.imageMain}
          />
        </Box>
        <Box style={{ padding: '10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            href={imageUrl}
            download={imageFilename}
            className={classes.downloadButton}
          >
            Скачать
          </Button>
        </Box>
        <Box style={{ padding: '10px' }}>
          <Box className={classes.imageList}>
            {similarImages.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/images/${img.split('/').pop()}`}
                alt={`Similar Image ${index + 1}`}
                className={classes.imageItem}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default FullscreenImageDialog;
