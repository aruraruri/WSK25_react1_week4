// components/MediaRow.js
import {useUserContext} from '../hooks/contextHooks';
import {useMediaActions} from '../hooks/apiHooks';
import { Link } from 'react-router-dom';

const MediaRow = ({item}) => {
  const {user} = useUserContext();
  const {deleteMedia, modifyMedia} = useMediaActions();

  const handleModify = () => {
    console.log('modify', item);
    // Example modification - in a real app you'd probably open a modal or form
    modifyMedia(item, {title: 'Updated Title'});
  };

  const handleDelete = () => {
    console.log('delete', item);
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMedia(item);
    }
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3">
        <img
          src={item.thumbnail ? item.thumbnail : 'placeholder-image.jpg'}
          alt={item.title}
          className="w-10 h-10 rounded-full"
        />
      </td>
      <td className="px-4 py-3">{item.title}</td>
      <td className="px-4 py-3">{item.description}</td>
      <td className="px-4 py-3">{new Date(item.created_at).toLocaleDateString()}</td>
      <td className="px-4 py-3">{item.filesize}</td>
      <td className="px-4 py-3">{item.media_type}</td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-4">
        <td><Link to="/single" state={{item}}>Single view</Link></td>
          {user && (user.user_id === item.user_id || user.level_name === 'admin') && (
            <>
              <button
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-800"
                onClick={handleModify}
              >
                Modify
              </button>
              <button
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MediaRow;
