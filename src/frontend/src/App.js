// App.js
import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResults';
import { CssBaseline, makeStyles } from '@material-ui/core';
import UploadButton from './components/UploadButton';
import SearchComponent from './components/SearchComponent';

const useStyles = makeStyles((theme) => ({
  appBackground: {
    minHeight: '100vh', // Минимальная высота всего экрана
    background: `url('/i.webp') no-repeat center center`, // Путь к вашему фоновому изображению
    backgroundSize: 'cover', // Растягиваем изображение, чтобы покрыть всю область
  },
  content: {
    paddingTop: theme.spacing(10), // Отступ сверху для поле поиска
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    textAlign: 'center', // Выравнивание по центру
  },
}));

function App() {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  const handleSearch = (value) => {
    setQuery(value);
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.appBackground}>
        <div className={classes.content}>
          <UploadButton />
          <SearchComponent />
        </div>
      </div>
    </>
  );
}

export default App;
