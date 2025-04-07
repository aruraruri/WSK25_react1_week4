// src/components/MediaRow.jsx
import PropTypes from 'prop-types';

const MediaRow = (props) => {
  const {item} = props;
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
          </tr>

      </>
  );
};

MediaRow.propTypes = {item: PropTypes.object.isRequired};

export default MediaRow;

