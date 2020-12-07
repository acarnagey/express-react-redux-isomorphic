export default (html, state) =>
  `<html>
<head>
  <title>redux</title>
  <link
    href="https://fonts.googleapis.com/css?family=Fira+Sans:300,400,700"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/purecss@2.0.3/build/pure-min.css"
  />
  <link rel="stylesheet" href="/assets/app.css" />
</head>
<body>
  <div id="app">${html}</div>
</body>
<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(state)}
</script>
<script src="/assets/bundle.js"></script>
</html>
`;
