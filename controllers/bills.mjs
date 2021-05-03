export default function initBillsController(db) {
  const chargeList = async (req, res) => {
    try {
      const charges = await db.Charge.findAll();
      console.log('all charges:', charges);
      res.send({ charges });
    }
    catch (error) {
      console.log(error);
    }
  };

  const addBill = async (req, res) => {
    try {
      console.log(req.body);
      const newBill = await db.Bill.create({
        horseId: Number(req.body.horse_id),
        ownerId: Number(req.body.owner_id),
        total: Number(req.body.total),
      });
      console.log('new bill', newBill);

      await req.body.charges.forEach((charge) => {
        console.log('****** charge id', charge.id);
        const joinTableEntry = db.BillCharge.create({
          billId: newBill.id,
          chargeId: charge.id,
          quantity: charge.qty,
        });
        console.log('join table entry created', joinTableEntry);
      });

      res.send({ newBill });
    }
    catch (error) {
      console.log(error);
    }
  };
  return { chargeList, addBill };
}
