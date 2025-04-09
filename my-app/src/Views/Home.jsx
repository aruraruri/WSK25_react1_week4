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

  useEffect(() => {
    const getMedia = async () => {
      try {
        const data = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
        setMediaArray(data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }

    };
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
