export default function initOwnersController(db) {
  // get list of all owners
  const ownerList = async (req, res) => {
    try {
      const allOwners = await db.Owner.findAll();
      console.log(allOwners);
      res.send({ allOwners });
    } catch (error) {
      console.log(error);
    }
  };

  const newOwner = async (req, res) => {
    console.log('new owner', req.body);

    try {
      const addOwner = await db.Owner.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        phoneNumber: Number(req.body.phoneNumber),
        gst: req.body.gst,
      });
      console.log('added owner', addOwner);

      const newOwnerList = await db.Owner.findAll();

      res.send({ newOwnerList });
    }
    catch (error) {
      console.log(error);
    }
  };
  return { ownerList, newOwner };
}
