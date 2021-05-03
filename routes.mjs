import { resolve } from 'path';
import db from './models/index.mjs';
import initOwnersController from './controllers/owners.mjs';
import initHorsesController from './controllers/horses.mjs';
import initBillsController from './controllers/bills.mjs';

export default function routes(app) {
  const OwnersController = initOwnersController(db);
  const HorsesController = initHorsesController(db);
  const BillsController = initBillsController(db);

  app.get('/owners', OwnersController.ownerList);
  app.get('/horse-list/:id', HorsesController.horseList);
  app.get('/horse-details/:id', HorsesController.horseDetails);
  app.get('/horse-problems', HorsesController.horseProblems);
  app.post('/add-new-report', HorsesController.addNewReport);
  app.get('/charges', BillsController.chargeList);
  app.post('/new-bill', BillsController.addBill);

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
