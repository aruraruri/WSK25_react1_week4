import { useState } from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import { useMedia } from '../hooks/apiHooks';

function Home() {

  const [selectedItem, setSelectedItem] = useState(null);

  const { mediaArray } = useMedia();

  return (
    <>
    <h2 className="text-2xl my-4 font-mono ali">My Media</h2>

    <table>
        <thead>
          <tr className="*:p4 *:border-2 *:border-orange-600 *:my-2 *:rounded-lg">
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
