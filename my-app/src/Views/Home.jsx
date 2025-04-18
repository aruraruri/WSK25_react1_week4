import { useState } from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import { useMedia } from '../hooks/apiHooks';

function Home() {

  const [selectedItem, setSelectedItem] = useState(null);

  const { mediaArray } = useMedia();

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
