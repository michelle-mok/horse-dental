import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlertModal = ({
  trigger, setTrigger, horseList, horse, horseBehaviour, setHorseBehaviour,
}) => {
  const [alertList, setAlertList] = useState([]);
  const [alerts, setAlerts] = useState();
  const [alertIdList, setAlertIdList] = useState([]);
  const [horseBehaviourIds, setHorseBehaviourIds] = useState([]);

  const handleChange = (event, index) => {
    if (event.target.checked) {
      setAlerts([...alerts, Number(event.target.value)]);
    } else if (!event.target.checked) {
      if (alerts.includes(Number(event.target.value))) {
        for (let i = 0; i < alerts.length; i += 1) {
          if (alerts[i] === Number(event.target.value)) {
            alerts.splice(i, 1);

            setAlerts(alerts);
          }
        }
      }
    }
  };

  const editAlerts = () => {
    console.log('horse id', horseList[horse].id);
    console.log('alerts to be added:', alerts);
    axios
      .post('/edit-alerts', {
        behaviours: alerts,
        horseId: horseList[horse].id,
      })
      .then((response) => {
        console.log(response.data);
        setHorseBehaviour(response.data.newBehaviours);
        setTrigger(false);
      })
      .catch((error) => error);
  };

  useEffect(() => {
    console.log('horse behaviours', horseBehaviour);
    const horseBehaviourArray = [];
    for (let i = 0; i < horseBehaviour.length; i += 1) {
      horseBehaviourArray.push(horseBehaviour[i].id);
    }
    console.log('horse behaviour array', horseBehaviourArray);
    setAlerts(horseBehaviourArray);

    axios
      .get('/behaviours')
      .then((response) => {
        console.log(response.data.behaviours);
        setAlertList(response.data.behaviours);

        const behaviourIds = [];
        for (let i = 0; i < response.data.behaviours.length; i += 1) {
          behaviourIds.push(response.data.behaviours[i].id);
          console.log('behaviour ids array', behaviourIds);
        }
        setAlertIdList(behaviourIds);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log('alerts', alerts);
  console.log(alertList);
  console.log('horse behaviour', horseBehaviour);
  if (trigger) {
    return (
      <div className="alert-modal">
        <div className="modal-content">
          <button type="button" className="close-btn" onClick={() => setTrigger(false)}>&times;</button>
          <h3>Add Alert</h3>

          <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">

            {alertList.map((alert, index) => ((alerts.includes(alert.id))
              ? (
                <>
                  <input type="checkbox" className="btn-check" id={alert.id} value={alert.id} onChange={(event) => handleChange(event, index)} checked />
                  <label className="btn btn-outline-dark" htmlFor={alert.id}>{alert.name}</label>
                </>
              )

              : (
                <>
                  <input type="checkbox" className="btn-check" id={alert.id} value={alert.id} onChange={(event) => handleChange(event, index)} />
                  <label className="btn btn-outline-dark" htmlFor={alert.id}>{alert.name}</label>
                </>
              )))}
          </div>

          <br />
          <button type="button" className="btn btn-dark" onClick={editAlerts}>Submit </button>
        </div>
      </div>
    );
  }
  return '';
};

export default AlertModal;
