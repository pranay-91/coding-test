import './aliases';
import app from './app';
import config from './config';

app.listen(config.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application listening on: ${config.app.port}`);
});
