// src/components/MediaRow.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MediaRow = (props) => {
  const {item, setSelectedItem} = props;

const handleClick = () => {
  setSelectedItem(item);
  // Handle the click event here
}
  return (
    <>
          <tr key={item.media_id}>
            <td>{item.media_id}</td>
            <td>{item.user_id}</td>
            <td>{item.filename}</td>
            <td><img src={item.thumbnail}/></td>
            <td>{item.filesize}</td>
            <td>{item.media_type}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{new Date(item.created_at).toLocaleString()}</td>
            {/*<td><button onClick={handleClick}>View</button></td>*/}
            <td><Link to="/single" state={{item}}>Single view</Link></td>
          </tr>

      </>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setMediaItem: PropTypes.func.isRequired,
};

export default MediaRow;

