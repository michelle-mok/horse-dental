export default function initReportModel(sequelize, DataTypes) {
  return sequelize.define(
    'report',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      report: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      horseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'horses',
          key: 'id',
        },
      },
      ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'owners',
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
