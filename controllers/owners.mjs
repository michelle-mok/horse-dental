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

  return { ownerList };
}
