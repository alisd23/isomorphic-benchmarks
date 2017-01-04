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

if (_BUNDLE_SIZE_ === 1 || _BUNDLE_SIZE_ === 2 || _BUNDLE_SIZE_ === 3 || _BUNDLE_SIZE_ === 4 || _BUNDLE_SIZE_ === 5 || _BUNDLE_SIZE_ === 6) {
  require('assets/images/space_filler_1.jpg');
}
if (_BUNDLE_SIZE_ === 2 || _BUNDLE_SIZE_ === 3 || _BUNDLE_SIZE_ === 4 || _BUNDLE_SIZE_ === 5 || _BUNDLE_SIZE_ === 6) {
  require('assets/images/space_filler_2.jpg');
}
if (_BUNDLE_SIZE_ === 3 || _BUNDLE_SIZE_ === 4 || _BUNDLE_SIZE_ === 5 || _BUNDLE_SIZE_ === 6) {
  require('assets/images/space_filler_3.jpg');
}
if (_BUNDLE_SIZE_ === 4 || _BUNDLE_SIZE_ === 5 || _BUNDLE_SIZE_ === 6) {
  require('assets/images/space_filler_4.jpg');
}
if (_BUNDLE_SIZE_ === 5 || _BUNDLE_SIZE_ === 6) {
  require('assets/images/space_filler_5.jpg');
}
if (_BUNDLE_SIZE_ === 6) {
  require('assets/images/space_filler_6.jpg');
}
