export default function initBillChargeModel(sequelize, DataTypes) {
  return sequelize.define(
    'bill_charge',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      chargeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'charges',
          key: 'id',
        },
      },
      billId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'bills',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
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
