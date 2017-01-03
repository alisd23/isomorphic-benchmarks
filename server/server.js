import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import paths from 'config/paths';
import ports from 'config/ports';
import App from 'shared/components/App';
import memes from 'shared/memes';
import initialHtml from 'server/initial-html';

const API_DELAY = 150;

const getData = (cb) => setTimeout(cb, API_DELAY);

export default (params) => {
  const app = express();

  // Server static files (js, images)
  app.use(express.static(paths.build));

  app.get('/memes', (req, res) => {
    getData(() => res.status(200).send(memes));
  });

  app.get('/test', (req, res) => {
    const initialHTML = `
      <html>
        <head></head>
        <body>
          <script>window.location='/?timestamp=' + Date.now()</script>
        </body>
      </html>
    `;
    res.send(initialHTML);
  });

  // All page requests are handled in one function
  app.get('*', (req, res) => {
    let html;

    if (_ISOMORPHIC_) {
      getData((memes) => {
        const requestTime = req.query.timestamp;
        const markup = renderToString(
          <App memes={memes} />
        );
        html = initialHtml(markup, params.chunks(), memes, true, requestTime);
        res.status(200).send(html);
      });
    } else {
      html = initialHtml('', params.chunks());
      res.status(200).send(html);
    }
  });

  // Start server
  app.listen(ports.SERVER_PORT, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info('==> 🌎 WEB server listening on port %s.', ports.SERVER_PORT);
    }
  });
};
