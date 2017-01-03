import React from 'react';

export default ({ meme }) => (
  <div className='meme'>
    <img src={meme.image} />
    <h2>{meme.name}</h2>
  </div>
);
