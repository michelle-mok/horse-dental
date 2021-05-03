import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';
import initHorseModel from './horse.mjs';
import initOwnerModel from './owner.mjs';
import initBehaviourModel from './behaviour.mjs';
import initBillModel from './bill.mjs';
import initHorseProblemReportModel from './horseProblemReport.mjs';
import initProblemModel from './problem.mjs';
import initReportModel from './report.mjs';
import initChargeModel from './charge.mjs';
import initBillChargeModel from './billCharge.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Horse = initHorseModel(sequelize, Sequelize.DataTypes);
db.Owner = initOwnerModel(sequelize, Sequelize.DataTypes);
db.Bill = initBillModel(sequelize, Sequelize.DataTypes);
db.Behaviour = initBehaviourModel(sequelize, Sequelize.DataTypes);
db.Problem = initProblemModel(sequelize, Sequelize.DataTypes);
db.Report = initReportModel(sequelize, Sequelize.DataTypes);
db.Charge = initChargeModel(sequelize, Sequelize.DataTypes);
db.HorseProblemReport = initHorseProblemReportModel(sequelize, Sequelize.DataTypes);
db.BillCharge = initBillChargeModel(sequelize, Sequelize.DataTypes);

db.Horse.belongsToMany(db.Behaviour, { through: 'horse_behaviours' });
db.Behaviour.belongsToMany(db.Horse, { through: 'horse_behaviours' });

db.Horse.belongsToMany(db.Problem, { through: 'horse_problem_reports' });
db.Problem.belongsToMany(db.Horse, { through: 'horse_problem_reports' });

db.Report.belongsToMany(db.Problem, { through: 'horse_problem_reports' });
db.Problem.belongsToMany(db.Report, { through: 'horse_problem_reports' });

db.Bill.belongsToMany(db.Charge, { through: 'bill_charges' });
db.Charge.belongsToMany(db.Bill, { through: 'bill_charges' });

db.Owner.hasMany(db.Horse);
db.Horse.belongsTo(db.Owner);

db.Horse.hasMany(db.Bill);
db.Bill.belongsTo(db.Horse);

db.Owner.hasMany(db.Bill);
db.Bill.belongsTo(db.Owner);

db.Horse.hasMany(db.Report);
db.Report.belongsTo(db.Horse);

// db.Owner.hasMany(db.Report);
// db.Report.belongsTo(db.Owner);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
