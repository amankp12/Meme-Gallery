import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PhotoSwipe } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';

const MemeGallery = ({ memes, loadMoreMemes, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const galleryRef = useRef(null);

  const openGallery = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const handleImageClick = (index) => {
    if (index === memes.length - 1) {
      loadMoreMemes();
    } else {
      openGallery(index);
    }
  };

  const handleScroll = useCallback(() => {
    const gallery = galleryRef.current;
    if (gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight - 100) {
      loadMoreMemes();
    }
  }, [loadMoreMemes]);

  useEffect(() => {
    const gallery = galleryRef.current;
    gallery.addEventListener('scroll', handleScroll);
    return () => {
      gallery.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div ref={galleryRef} style={{ overflowY: 'auto', maxHeight: '500px' }}>
      {memes.map((meme, index) => (
        <img
          key={index}
          src={meme.thumbnail}
          alt={`Meme ${index}`}
          onClick={() => handleImageClick(index)}
          style={{ cursor: 'pointer', margin: '10px' }}
        />
      ))}

      {isLoading && <p>Loading...</p>}

      <PhotoSwipe
        isOpen={isOpen}
        items={memes.map((meme) => ({ src: meme.url, w: 1200, h: 800 }))}
        options={{ index: currentImage }}
        onClose={closeGallery}
      />
    </div>
  );
};

export default MemeGallery;