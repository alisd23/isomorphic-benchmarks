import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import App from 'shared/components/App';

const render = (memes, ...args) => {
  ReactDOM.render(
    <App memes={memes} />,
    document.getElementById('root'),
    ...args
  );
};

const requestTime = queryString.parse(window.location.search).timestamp;

if (_ISOMORPHIC_) {
  render(
    window._INITIAL_STATE_,
    console.log(
      '[ISOMORPHIC] Rendered on client -',
      (Date.now() - requestTime) + 'ms'
    )
  );
} else {
  fetch('/memes')
    .then(res => res.json())
    .then(memes => render(
      memes,
      console.log(
        '[CLIENT] First paint -',
        (Date.now() - requestTime) + 'ms'
      )
    ));
}
