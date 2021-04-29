export default function initBillModel(sequelize, DataTypes) {
  return sequelize.define(
    'bill',
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
      ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'owners',
          key: 'id',
        },
      },
      gst: {
        type: DataTypes.INTEGER,
      },
      charges: {
        type: DataTypes.DECIMAL,
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
