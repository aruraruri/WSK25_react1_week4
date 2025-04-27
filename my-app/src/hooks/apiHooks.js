import React, {useEffect, useState} from 'react';
import {fetchData} from '../Utils/fetchData';
import {mediaAPI} from './media';
import {useMediaContext} from '../contexts/MediaConstext';
import {useNavigate} from 'react-router-dom';

const authApiUrl = import.meta.env.VITE_AUTH_API;
const mediaApiUrl = import.meta.env.VITE_MEDIA_API;

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
    const data = {
      ...inputs,
      ...file,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return await fetchData(`${mediaApiUrl}/media`, fetchOptions);
  };

  const modifyMedia = async (inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(`${mediaApiUrl}/media/${inputs.id}`, fetchOptions);
  };

  const deleteMedia = async (id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
    };

    console.log(mediaApiUrl + '/media/' + id);

    return await fetchData(`${mediaApiUrl}/media/${id}`, fetchOptions);
  };

  return {mediaArray, postMedia, deleteMedia, modifyMedia};
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

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      mode: 'cors',
      body: formData,
    };

    return await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
  };

  return {postFile};
};

export {useMedia, useAuthentication, useUser, useFile};
