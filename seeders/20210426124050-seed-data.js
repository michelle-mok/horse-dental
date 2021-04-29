module.exports = {
  up: async (queryInterface) => {
    const ownerData = [
      {
        first_name: 'Mickey',
        last_name: 'Mouse',
        email: 'mickey@disney.com',
        address: '11 Main Street, Magic Kingdom',
        phone_number: '34587512',
        gst: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Donald',
        last_name: 'Duck',
        email: 'donald@disney.com',
        address: '21 Main Street, Magic Kingdom',
        phone_number: '89764531',
        gst: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Minnie',
        last_name: 'Mouse',
        email: 'donald@disney.com',
        address: '33 Cedar Avenue, Magic Kingdom',
        phone_number: '12697843',
        gst: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('owners', ownerData);

    const horseData = [
      {
        name: 'Gold Kingdom',
        mra_number: 'E459',
        trainer: 'Tan Kah Soon',
        next_treatment_date: new Date(2021, 5, 20),
        owner_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Nowyousee',
        mra_number: 'E177',
        trainer: 'Tan Kah Soon',
        next_treatment_date: new Date(2021, 5, 20),
        owner_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Golden Brilliant',
        mra_number: 'K155',
        trainer: 'John O\' Hara',
        next_treatment_date: new Date(2021, 5, 10),
        owner_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Chevron',
        mra_number: 'V123',
        trainer: 'John O\' Hara',
        next_treatment_date: new Date(2021, 5, 10),
        owner_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('horses', horseData);

    // const horseOwnerData = [
    //   {
    //     horse_id: horseData[0].id,
    //     owner_id: ownerData[0].id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    //   {
    //      horse_id: horseData[1].id,
    //     owner_id: ownerData[0].id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    //   {
    //     horse_id: horseData[2].id,
    //     owner_id: ownerData[1].id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    //   {
    //     horse_id: horseData[3].id,
    //     owner_id: ownerData[2].id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    // ];

    // await queryInterface.bulkInsert('horse_owners', horseOwnerData);

    // Define cart data, 2 carts
    const behaviourData = [
      {
        name: 'head shy',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'kicks',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'aggressive',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'needs sedation',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'overreacts',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'rears',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('behaviours', behaviourData);

    // Define cart item data, i.e. put items in cart
    const ProblemData = [
      {
        name: 'tooth decay',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'parrot mouth',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'sheer mouth',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'caudal hooks',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'wolf teeth',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('problems', ProblemData);
  },

  down: async (queryInterface) => {
    // Delete rows from tables with foreign key references first
    await Promise.all([
      queryInterface.bulkDelete('horses', null, {}),

    ]);
    await Promise.all([
      queryInterface.bulkDelete('owners', null, {}),
      queryInterface.bulkDelete('behaviours', null, {}),
      queryInterface.bulkDelete('problems', null, {}),
    ]);
  },
};
