export default (markup, assets, state, isIsomorphic, requestTime) => `
  <!doctype html>
  <html>
    <head>
      <style>
        #app > h1 {
          margin-bottom: 50px;
          text-align: center;
        }
        .meme {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .meme img {
          width: 200px;
          margin-right: 30px;
        }
      </style>
      <link rel='icon' href='/assets/favicon.ico' />
    </head>
    <body>
      <div id="root">${markup}</div>
      <div id="fillers">
        ${
          _ISOMORPHIC_
            ? Array(_BUNDLE_SIZE_)
              .fill(null)
              .map(() => `<img src=${require('assets/images/doge.jpg')} />`)
              .join('')
            : ''
        }
      </div>
    </body>
    ${
      state
        ? `<script>window._INITIAL_STATE_ = ${JSON.stringify(state)}</script>`
        : ``
    }
    ${
      isIsomorphic
        ? `
          <script>
            console.log(
              '[ISOMORPHIC] First paint -',
              (Date.now() - ${requestTime}) + 'ms'
            )
          </script>
        `
        : ''
    }
    ${
      Object.keys(assets.javascript).map(name =>
        `<script src="${assets.javascript[name]}"></script>`
      )
    }
  </html>
`;
