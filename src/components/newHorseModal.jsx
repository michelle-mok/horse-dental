import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewHorseModal = ({
  trigger, setTrigger, ownerList, owner, horseList, setHorseList,
}) => {
  const [name, setName] = useState('');
  const [mraNumber, setMraNumber] = useState('');
  const [trainer, setTrainer] = useState('');
  const [nextTreatmentDate, setNextTreatmentDate] = useState('');

  const addNewHorse = () => {
    axios
      .post(`/add-new-horse/${ownerList[owner].id}`, {
        name,
        mraNumber,
        trainer,
        nextTreatmentDate,
      })
      .then((response) => {
        console.log(response.data);
        setTrigger(false);
        setHorseList([...horseList, response.data.addHorse]);
      })
      .catch((error) => error);
  };

  console.log('owner list', ownerList);
  if (trigger) {
    return (
      <div className="new-owner-modal">
        <div className="modal-content">
          <button type="button" className="close-btn" onClick={() => setTrigger(false)}>&times;</button>
          <h3>New Owner</h3>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
          <br />
          <label htmlFor="mraNumber">MRA number: </label>
          <input type="text" name="mraNumber" value={mraNumber} onChange={(event) => setMraNumber(event.target.value)} />
          <br />
          <label htmlFor="trainer">Trainer: </label>
          <input type="text" name="trainer" value={trainer} onChange={(event) => setTrainer(event.target.value)} />
          <br />
          <label htmlFor="nextTreatmentDate">next Treatment Date: </label>
          <input type="date" name="nextTreatmentDate" value={nextTreatmentDate} onChange={(event) => setNextTreatmentDate(event.target.value)} />
          <br />
          <br />
          <button type="button" className="btn btn-dark" onClick={addNewHorse}>Submit </button>
        </div>
      </div>
    );
  }
  return '';
};
export default NewHorseModal;
