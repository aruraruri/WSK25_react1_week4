import React, {useEffect, useState} from 'react';
import {fetchData} from '../Utils/fetchData';

// TODO: add necessary imports
export const useMedia = () => {
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

  console.log('media array:', mediaArray);

  return {mediaArray};
};

// make a table with the mediaArray

export const useAuthentication = () => {
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

    return loginResult;
  };
  return {postLogin};
};

export function useUser() {
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
  return {getUserByToken};
}
