import React, {useEffect, useState} from 'react';
import {fetchData} from '../Utils/fetchData';
import {mediaAPI} from './media';
import {useMediaContext} from '../contexts/MediaConstext';
import {useNavigate} from 'react-router-dom';

export const useMediaActions = () => {
  const navigate = useNavigate();
  const {updateMedia} = useMediaContext();

  const deleteMedia = async (item) => {
    try {
      const token = localStorage.getItem('token');
      await mediaAPI.deleteMedia(item.media_id, token);
      // Refresh after deletion
      navigate(0);
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Delete failed. Please try again.');
    }
  };

  const modifyMedia = async (item, newData) => {
    try {
      const token = localStorage.getItem('token');
      const result = await mediaAPI.modifyMedia(item.media_id, newData, token);
      updateMedia(result);
      // Refresh after modification
      navigate(0);
    } catch (error) {
      console.error('Modify failed:', error);
      alert('Modify failed. Please try again.');
    }
  };

  return {deleteMedia, modifyMedia};
};

// TODO: add necessary imports
const useMedia = () => {
  // TODO: move mediaArray state here
  // TODO: move getMedia function here
  // TODO: move useEffect here
  const [mediaArray, setMediaArray] = useState([]);

  async function getMedia() {
    try {
      const mediaData = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      console.log('mediaData', mediaData);

      const uniqueUserIds = [...new Set(mediaData.map((item) => item.user_id))];

      console.log('uniqueUserIds', uniqueUserIds);

      const authApiUrl = import.meta.env.VITE_AUTH_API;

      const userData = await Promise.all(
        uniqueUserIds.map(async (userId) => {
          return await fetchData(`${authApiUrl}/users/${userId}`);
        }),
      );

      console.log('userData', userData);

      const newData = mediaData.map((item) => {
        const user = userData.find(({user_id}) => user_id === item.user_id);
        return {...item, username: user.username};
      });

      setMediaArray(newData);
    } catch (error) {
      console.error('error', error);
    }
  }

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = async (file, inputs, token) => {
    // Create FormData instead of JSON
    const formData = new FormData();

    // Append the file
    formData.append('file', file);

    // Append other inputs
    Object.entries(inputs).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token, // Fixed: space after Bearer
        // DON'T set Content-Type - let browser set it with boundary
      },
      body: formData, // Use FormData instead of JSON
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_MEDIA_API}/media`,
        fetchOptions,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  console.log('media array:', mediaArray);

  return {mediaArray, postMedia};
};

// token check from local storage, returns boolean
const tokenInLocalStorage = () => {
  Boolean(localStorage.getItem('token'));
};

// make a table with the mediaArray

const useAuthentication = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
    //console.log('loginResult', loginResult);

    setIsLoggedIn(tokenInLocalStorage());

    return loginResult;
  };
  return {postLogin, isLoggedIn};
};

function useUser() {
  async function getUserByToken() {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      return await fetchData(
        import.meta.env.VITE_AUTH_API + '/users/token',
        fetchOptions,
      );
    } catch (error) {
      console.error('error', error);
    }
  }

  async function postUser(inputs) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const postResults = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
    console.log('post result: ', postResults);

    return postResults;
  }
  return {getUserByToken, postUser};
}

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log('formData', formData);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      mode: 'cors',
      body: formData,
    };

    const uploadResult = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
    return uploadResult;
  };
  return {postFile};
};

export {useMedia, useAuthentication, useUser, useFile};
