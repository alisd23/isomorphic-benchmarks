import React from 'react';
import Meme from 'shared/components/Meme';

export default ({ memes }) => (
  <div id='app'>
    <h1>Meme database</h1>
    {
      memes.map(meme => (
        <Meme
          key={meme.id}
          meme={meme}
        />
      ))
    }
  </div>
);
