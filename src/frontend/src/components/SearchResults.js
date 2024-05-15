import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress, makeStyles } from '@material-ui/core';
import FullscreenImageDialog from './FullscreenImageDialog';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: theme.spacing(8)
  },
  imageGallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  imageItem: {
    flex: '1 1 auto',
    height: '300px',
    cursor: 'pointer',
    position: 'relative',
    '&:hover div': { // При наведении на элемент списка, мы изменяем div с классом overlay
      transform: 'scale(1)',
    },
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(57, 57, 57, 0.502)',
    top: 0,
    left: 0,
    transform: 'scale(0)',
    transition: 'all 0.2s 0.1s ease-in-out',
    color: '#fff',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    verticalAlign: 'middle',
    borderRadius: theme.shape.borderRadius,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}));
const similarImages = [
  "http://localhost:5000/images/000000563683_jpg.rf.bfd8d01a8ab69ed6914ba2bece821b3a.jpg",
  "http://localhost:5000/images/000000563683_jpg.rf.bfd8d01a8ab69ed6914ba2bece821b3a.jpg",
  "http://localhost:5000/images/000000563683_jpg.rf.bfd8d01a8ab69ed6914ba2bece821b3a.jpg",
  "http://localhost:5000/images/000000563683_jpg.rf.bfd8d01a8ab69ed6914ba2bece821b3a.jpg",
  "http://localhost:5000/images/000000563683_jpg.rf.bfd8d01a8ab69ed6914ba2bece821b3a.jpg",

];
const SearchResults = ({ items, hasMore, fetchMoreData }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const getImageFilename = (url) => {
    return url.split('/').pop();
  };

  const handleOpenImage = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  return items ? (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        }
        className={classes.gridContainer}
      >
        <ul className={classes.imageGallery}>
          {items.map((item, index) => (
            <li key={index} className={classes.imageItem} onClick={() => handleOpenImage(item.image_url)}>
              <img 
                src={`http://localhost:5000/images/${getImageFilename(item.image_url)}`}
                alt={`Image ${index}`}
                className={classes.image}
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
      {openDialog && (
        <FullscreenImageDialog
          image={selectedImage}
          similarImages={similarImages}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </>
  ) : null; 
};

export default SearchResults;