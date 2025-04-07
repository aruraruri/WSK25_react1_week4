// src/components/MediaRow.jsx
import PropTypes from 'prop-types';

const MediaRow = (props) => {
  const {item} = props;
  return (
    <>

<h1>Media List</h1>
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
          </tr>
        </thead>

      <tbody>
        {item.map((media) => (
          <tr key={media.media_id}>
            <td>{media.media_id}</td>
            <td>{media.user_id}</td>
            <td>{media.filename}</td>
            <td><img src={media.thumbnail}/></td>
            <td>{media.filesize}</td>
            <td>{media.media_type}</td>
            <td>{media.title}</td>
            <td>{media.description}</td>
            <td>{new Date(media.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
      </table>
      </>
  );
};

MediaRow.propTypes = {item: PropTypes.object.isRequired};

export default MediaRow;

