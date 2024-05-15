// components/SearchComponent.js
import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import UploadForm from './UploadForm';
import axios from 'axios';
import { Dialog } from '@material-ui/core';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [photo, setPhoto] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handlePhotoUpload = () => {
    setShowUploadForm(true);
  };

  const handleCloseUploadForm = () => {
    setShowUploadForm(false);
  };

  const searchByPhoto = (file) => {
    setPhoto(file);
    if (photo){
        const formData = new FormData();
        formData.append('photo', photo[0]);
    
        axios.post('http://localhost:5000/search_by_photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log('Search results:', response.data);
          setShowUploadForm(false);
          setItems(response.data);
          setPage(1);
          setHasMore(false);
        })
        .catch(error => {
          setPhoto(null);
          setShowUploadForm(false);
          console.error('Error during search by photo:', error);
        });
    }
  };

  const searchByText = (searchQuery) => {
    setQuery(searchQuery);
    if (query){
        axios.get('http://localhost:5000/search', {
          params: { query: query, page, per_page: 20 }
        })
        .then((response) => {
          const { items: newItems, has_more } = response.data;
          setItems(prevItems => [...prevItems, ...newItems]);
          setPage(prevPage => prevPage + 1);
          setHasMore(has_more);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setQuery('');
          setHasMore(false);
        });
    }
  };

  return (
    <div>
      <SearchBox onSearch={searchByText} onPhotoUpload={handlePhotoUpload} />
      <Dialog open={showUploadForm} onClose={handleCloseUploadForm}>
        <UploadForm onFileSelected={searchByPhoto} isLoading={false} />
      </Dialog>
      <SearchResults items={items} hasMore={hasMore} fetchMoreData={() => photo ? searchByPhoto(photo) : searchByText(query)} />
    </div>
  );
};

export default SearchComponent;
