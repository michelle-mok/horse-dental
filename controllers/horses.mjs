export default function initHorsesController(db) {
  // get list of all horses that belong to one owner
  const horseList = async (req, res) => {
    try {
      const owner = await db.Owner.findOne({
        where: {
          id: Number(req.body.id),
        },
      });
      console.log(owner);

      const horses = await owner.getHorses();
      console.log('list of horses', horses);

      res.send({ horses });
    } catch (error) {
      console.log(error);
    }
  };

  const horseDetails = async (req, res) => {
    console.log('request for 1 horse', req.body);

    try {
      const horse = await db.Horse.findOne({
        where: {
          id: Number(req.body.id),
        },
      });
      console.log('horse', horse);
      res.send({ horse });
    }
    catch (error) {
      console.log(error);
    }
  };
  return { horseList, horseDetails };
}
