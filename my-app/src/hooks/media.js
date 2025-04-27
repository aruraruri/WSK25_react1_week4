// api/media.js
const baseUrl = 'https://media2.edu.metropolia.fi/media-api/api/v1';
const mediaUrl = 'https://media2.edu.metropolia.fi/media-api/api/v1/media/';

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const mediaAPI = {
  getAllMedia: async () => {
    return await fetchData(`${baseUrl}/media`);
  },

  getMediaById: async (id) => {
    return await fetchData(`${baseUrl}/media/${id}`);
  },

  postMedia: async (data, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    };
    return await fetchData(`${baseUrl}/media`, options);
  },

  deleteMedia: async (id, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData(`${baseUrl}/media/${id}`, options);
  },

  modifyMedia: async (id, data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    };
    return await fetchData(`${baseUrl}/media/${id}`, options);
  },

  getMediaByUser: async (id, token) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData(`${baseUrl}/media/user/${id}`, options);
  },
};

export {mediaAPI, mediaUrl};
