import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillModal = ({
  trigger, setTrigger, horseList, horse, ownerList, owner,
}) => {
  const [chargeList, setChargeList] = useState([]);
  const [newBillItem, setNewBillItem] = useState();
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    axios
      .get('/charges')
      .then((response) => {
        console.log(response.data.charges);
        setChargeList(response.data.charges);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setChargeSelected = (charge, index) => {
    setNewBillItem({ ...chargeList[index], qty: 1 });
    console.log('new bill item', newBillItem);

    if (newBillItem !== undefined) {
      setBillItems([...billItems, newBillItem]);
    }
  };

  const BillItem = ({
    id, name, price, qty, updateQty,
  }) => {
    const addOne = () => {
      updateQty(id, qty + 1);
    };

    const subtractOne = () => {
      updateQty(id, qty - 1);
    };

    return (
      <div className="bill-item">
        <div>
          {name}
          {' '}
          :
          {' '}
          $
          {price}
        </div>
        <div>
          <button onClick={subtractOne} disabled={qty < 1}> - </button>
          {qty}
          <button onClick={addOne} disabled={qty < 1}> + </button>
        </div>
        <div>
          Total:
          {qty * price}
        </div>
      </div>
    );
  };

  const NewBill = () => {
    const [charges, setCharges] = useState(billItems);

    const submitBill = () => {
      axios
        .post('/new-bill', {
          horse_id: horseList[horse].id,
          owner_id: ownerList[owner].id,
          charges,
          total: grandTotal,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const updateQty = (id, newQty) => {
      const newCharges = charges.map((charge) => {
        if (charge.id === id) {
          return { ...charge, qty: newQty };
        }
        return charge;
      });
      setCharges(newCharges);
    };

    const grandTotal = charges.reduce((total, item) => (
      total + item.qty * item.price
    ), 0).toFixed(2);

    console.log('charges', charges);
    return (
      <div className="new-bill">
        <h3>New Bill</h3>
        <div>
          {charges.map((item) => (
            <BillItem key={item.id} updateQty={updateQty} {...item} />
          ))}
        </div>
        <div>
          Grand Total: $
          {grandTotal}
        </div>
        <button type="button" className="btn btn-dark" onClick={submitBill}>submit bill</button>
      </div>
    );
  };

  console.log('bill items', billItems);

  if (trigger) {
    return (
      <div className="bill-modal">
        <div className="modal-content">
          <button type="button" className="close-btn" onClick={() => setTrigger(false)}>&times;</button>
          <h3>Select charges</h3>
          <ul className="list-group">
            {chargeList.map((charge, index) => (
              <button type="button" className="list-group-item list-group-item-action" key={charge.id} onClick={() => setChargeSelected(charge, index)}>
                {charge.name}
              </button>
            ))}
          </ul>
          <NewBill />
        </div>
      </div>
    );
  }
  return '';
};
export default BillModal;
