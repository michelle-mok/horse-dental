export default function initHorseProblemReportModel(sequelize, DataTypes) {
  return sequelize.define(
    'horse_problem_report',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      horseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'horses',
          key: 'id',
        },
      },
      problemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'problems',
          key: 'id',
        },
      },
      reportId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'reports',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    },
  );
}
