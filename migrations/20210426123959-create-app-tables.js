module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('owners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      gst: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('horses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mra_number: {
        type: Sequelize.STRING,
      },
      trainer: {
        type: Sequelize.STRING,
      },
      next_treatment_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'owners',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('behaviours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      horse_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'horses',
          key: 'id',
        },
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'owners',
          key: 'id',
        },
      },
      gst: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      total_charge: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      horse_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'horses',
          key: 'id',
        },
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'owners',
          key: 'id',
        },
      },
      report: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('horse_problem_reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      horse_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'horses',
          key: 'id',
        },
      },
      problem_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'problems',
          key: 'id',
        },
      },
      report_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'reports',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('horse_behaviours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      horse_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'horses',
          key: 'id',
        },
      },
      behaviour_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'behaviours',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.createTable('horse_owners', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER,
    //   },
    //   horse_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'horses',
    //       key: 'id',
    //     },
    //   },
    //   owner_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'owners',
    //       key: 'id',
    //     },
    //   },
    //   created_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    //   updated_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },

    // });
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable('horse_owners', null, {});
    await queryInterface.dropTable('horse_behaviours', null, {});
    await queryInterface.dropTable('horse_problems', null, {});
    await queryInterface.dropTable('bills', null, {});
    await queryInterface.dropTable('reports', null, {});
    await queryInterface.dropTable('behaviours', null, {});
    await queryInterface.dropTable('problems', null, {});
    await queryInterface.dropTable('horses', null, {});
    await queryInterface.dropTable('owners', null, {});
  },
};
