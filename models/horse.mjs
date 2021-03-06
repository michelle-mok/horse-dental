export default function initHorseModel(sequelize, DataTypes) {
  return sequelize.define(
    'horse',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      mraNumber: {
        type: DataTypes.STRING,
      },
      trainer: {
        type: DataTypes.STRING,
      },
      ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'horses',
          key: 'id',
        },
      },
      nextTreatmentDate: {
        allowNull: false,
        type: DataTypes.DATE,
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
