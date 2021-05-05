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

  const alerts = async (req, res) => {
    const behaviours = await db.Behaviour.findAll();
    console.log('alert list', behaviours);

    res.send({ behaviours });
  };

  const editBehaviour = async (req, res) => {
    console.log('req body edit behaviours', req.body);
    // const newBehaviours = await db.Horse.addBehaviours
    try {
      const horse = await db.Horse.findOne({
        where: {
          id: Number(req.body.horseId),
        },
      });
      console.log('horse', horse);

      const behaviours = await horse.getBehaviours();
      console.log(behaviours);

      const deleteBehaviours = await horse.removeBehaviours(behaviours);
      console.log('deleted behaviours', deleteBehaviours);

      const addNewBehaviours = await horse.addBehaviours(req.body.behaviours);
      console.log('new behaviours', addNewBehaviours);

      const newBehaviours = await horse.getBehaviours();
      console.log('new behaviours', newBehaviours);
      res.send({ newBehaviours });
    }
    catch (error) {
      console.log(error);
    }
  };

  const newHorse = async (req, res) => {
    console.log('horse details ******', req.body);
    console.log('owner id', req.params.id);
    try {
      const addHorse = await db.Horse.create({
        name: req.body.name,
        mraNumber: req.body.mraNumber,
        trainer: req.body.trainer,
        nextTreatmentDate: req.body.nextTreatmentDate,
        ownerId: req.params.id,
      });
      console.log('new horse *****', addHorse);

      res.send({ addHorse });
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    horseList, horseDetails, horseProblems, addNewReport, alerts, editBehaviour, newHorse,
  };
}
