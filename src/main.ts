import app from './app';
import config from './config';

app.listen(config.app.port, () => {
  console.log(`Application listening on: ${config.app.port}`);
});
