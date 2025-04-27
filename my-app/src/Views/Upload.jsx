import React, {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';

// Upload.jsx
const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      if (!file) throw new Error('No file selected');

      // 1. Upload the file
      const fileResult = await postFile(file, token);
      if (!fileResult?.data) {
        throw new Error('File upload failed: ' + JSON.stringify(fileResult));
      }

      // 2. Create media entry
      const mediaResult = await postMedia(
        {
          filename: fileResult.data.filename,
          filesize: fileResult.data.filesize,
          media_type: fileResult.data.media_type,
        },
        inputs,
        token
      );

      if (!mediaResult) {
        throw new Error('Media creation failed');
      }

      navigate('/');
    } catch (e) {
      console.error('Upload error:', e);
      alert('Upload failed: ' + e.message);
    }
  };
  const {inputs, handleInputChange, handleSubmit} = useForm(doUpload);

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={file && inputs?.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
