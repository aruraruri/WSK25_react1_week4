// contexts/MediaContext.js
import { createContext, useState, useContext } from 'react';

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [media, setMedia] = useState([]);

  const updateMedia = (updatedItem) => {
    setMedia(prevMedia =>
      prevMedia.map(item =>
        item.media_id === updatedItem.media_id ? updatedItem : item
      )
    );
  };

  return (
    <MediaContext.Provider value={{ media, updateMedia }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaContext must be used within a MediaProvider');
  }
  return context;
};
