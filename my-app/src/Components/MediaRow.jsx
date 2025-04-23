// src/components/MediaRow.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../hooks/apiHooks';

const MediaRow = (props) => {
  const  {isLoggedIn} = useAuthentication();

  const {item, setSelectedItem} = props;

const handleClick = () => {
  setSelectedItem(item);
  // Handle the click event here
}
  return (
    <>
          <tr className="*:p4 *:border-2 *:border-orange-600 *:my-2 *:rounded-lg mb-4" key={item.media_id}>
            <td>{item.media_id}</td>
            <td>{item.user_id}</td>
            <td>{item.filename}</td>
            <td><img src={item.thumbnail} className="h-52 object-cover"/></td>
            <td>{item.filesize}</td>
            <td>{item.media_type}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.username}</td>
            <td>{new Date(item.created_at).toLocaleString()}</td>
            {/*<td><button onClick={handleClick}>View</button></td>*/}
            <td className="p-0!"><Link to="/single" state={{item}} classname="hover:bg-amber-400 p-8">Single view</Link></td>
            {isLoggedIn && item.user_id === 1 && (
          <td className="p-0!">
            <button
              type="button"
              onClick={() => {
                console.log("delete button clicked");
              }}
              className="p-0!"
            >
              Delete
            </button>
          </td>
        )}
          </tr>

      </>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setMediaItem: PropTypes.func.isRequired,
};

export default MediaRow;

