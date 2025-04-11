import React, { useEffect } from 'react'
import MediaRow from '../components/MediaRow';
import { useState } from 'react';
import SingleView from '../components/SingleView';
import { fetchData } from '../Utils/fetchData';

function Home() {
  const [mediaArray, setMediaArray] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  console.log('Selected item:', selectedItem);
  // make a table with the mediaArray

async function getMedia() {
  try {
    const mediaData = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
    );

    console.log('mediaData', mediaData);

    const uniqueUserIds = [...new Set(mediaData.map(item => item.user_id))];

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
  }, [])

  console.log('media array:', mediaArray);


  return (
    <>
    <div>Home</div>

    <table>
        <thead>
          <tr>
            <th>Media ID</th>
            <th>User ID</th>
            <th>Filename</th>
            <th>Thumbnail</th>
            <th>Filesize</th>
            <th>Media Type</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created At</th>
            <th>Show/Hide</th>
          </tr>
        </thead>

    <tbody>
      {mediaArray.map((item) => (
        <MediaRow key={item.media_id} item={item} setSelectedItem={setSelectedItem} />
      ))}
    </tbody>
    </table>
    <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  )
}

export default Home
