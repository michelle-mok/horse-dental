import { resolve } from 'path';
import db from './models/index.mjs';
import initOwnersController from './controllers/owners.mjs';
import initHorsesController from './controllers/horses.mjs';

export default function routes(app) {
  const OwnersController = initOwnersController(db);
  const HorsesController = initHorsesController(db);
  // special JS page. Include the webpack index.html file

  app.get('/owners', OwnersController.ownerList);
  app.post('/horse-list', HorsesController.horseList);
  app.post('/horse-details', HorsesController.horseDetails);

  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
