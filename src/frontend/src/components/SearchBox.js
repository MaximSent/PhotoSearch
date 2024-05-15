// components/SearchBox.js
import React, { useState } from 'react';
import { makeStyles, Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative', 
    zIndex: 10, 
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.background.default,
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider, 
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '1rem',
  },
  iconButton: {
    padding: theme.spacing(2),
  },
}));

const SearchBox = ({ onSearch, onPhotoUpload }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search for images"
        inputProps={{ 'aria-label': 'search for images' }}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <IconButton className={classes.iconButton} aria-label="upload" onClick={onPhotoUpload}>
        <PhotoCameraIcon />
      </IconButton>
      <IconButton className={classes.iconButton} aria-label="search" onClick={() => onSearch(inputValue.trim())}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
