import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemeGallery from '../components/MemeGallery';

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [after, setAfter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMemes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://www.reddit.com/r/memes.json${after ? `?after=${after}` : ''}`
      );
      const memeData = response.data.data.children.map((post) => ({
        id: post.data.id,
        thumbnail: post.data.thumbnail,
        url: post.data.url,
      }));
      setMemes([...memes, ...memeData]);
      setAfter(response.data.data.after);
    } catch (error) {
      console.error('Error fetching memes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMemes = () => {
    if (!isLoading) {
      fetchMemes();
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div>
      <h1>Meme Gallery</h1>
      <MemeGallery memes={memes} loadMoreMemes={loadMoreMemes} isLoading={isLoading} />
    </div>
  );
};

export default Home;