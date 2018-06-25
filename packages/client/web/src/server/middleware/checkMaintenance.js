import env from '@pesposa/core/src/config/env';

const maintenanceHtml = `
<!doctype html>
<html lang="en">
  <head>
    <title>Pesposa is down for maintenance</title>
  </head>
  <body>
  <style>
    body { text-align: center; padding: 150px; }
    h1 { font-size: 50px; }
    body { font: 20px Helvetica, sans-serif; color: #333; }
    article { display: block; text-align: left; width: 650px; margin: 0 auto; }
    a { color: #f53942; text-decoration: none; }
    a:hover { color: #333; text-decoration: none; }
  </style>

  <article>
    <h1>We&rsquo;ll be back soon!</h1>
    <div>
      <p>Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment. If you need to you can always <a href="mailto:hello@pesposa.com">contact us</a>, otherwise we&rsquo;ll be back online shortly!</p>
      <p><strong>&mdash; The Pesposa Team</strong></p>
    </div>
  </article>
  </body>
</html>
`;

const checkMaintenance = (req, res, next) => {
  const { maintenance } = env;

  if (maintenance) {
    res.status(503).send(maintenanceHtml);
  } else {
    next();
  }
};

export default checkMaintenance;
