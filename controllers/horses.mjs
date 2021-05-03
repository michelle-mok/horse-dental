export default function initHorsesController(db) {
  // get list of all horses that belong to one owner
  const horseList = async (req, res) => {
    try {
      const owner = await db.Owner.findOne({
        where: {
          id: Number(req.params.id),
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
    console.log('request for 1 horse', req.params.id);

    try {
      const horse = await db.Horse.findOne({
        where: {
          id: Number(req.params.id),
        },
      });
      console.log('horse', horse);

      const behaviours = await horse.getBehaviours();
      console.log('bahaviours', behaviours);

      const reports = await horse.getReports();
      console.log('list of reports for one horse', reports);

      res.send({ horse, behaviours, reports });
    }
    catch (error) {
      console.log(error);
    }
  };

  // const horseBehaviours = async (req, res) => {
  //   console.log('horse id', req.params.id);

  //   try {
  //     const horse = await db.Horse.findOne({
  //       where: {
  //         id: Number(req.params.id),
  //       },
  //     });
  //     console.log('horse', horse);

  //     const behaviours = await horse.getBehaviours();
  //     console.log('bahaviours', behaviours);
  //     res.send({ behaviours });
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // };

  // const horseReports = async (req, res) => {
  //   console.log('horse id', req.params.id);

  //   try {
  //     const horse = await db.Horse.findOne({
  //       where: {
  //         id: Number(req.params.id),
  //       },
  //     });
  //     console.log('horse', horse);

  //     const reports = await horse.getReports();
  //     console.log('list of reports for one horse', reports);
  //     res.send({ reports });
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // };

  const horseProblems = async (req, res) => {
    try {
      const problems = await db.Problem.findAll();
      console.log('all problems', problems);
      res.send({ problems });
    }
    catch (error) {
      console.log(error);
    }
  };

  const addNewReport = async (req, res) => {
    console.log('report to be added', req.body);

    try {
      const newReport = await db.Report.create({
        report: req.body.newReport,
        horseId: req.body.horseId,
      });
      console.log(newReport);
      res.send({ newReport });
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    horseList, horseDetails, horseProblems, addNewReport,
  };
}
