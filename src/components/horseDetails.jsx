import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportModal from './reportModal.jsx';
import BillModal from './billModal.jsx';
import AlertModal from './alertModal.jsx';

const HorseDetails = ({
  horseDetails, horse, horseList, setHorseDetails, owner, ownerList,
}) => {
  const [horseBehaviour, setHorseBehaviour] = useState([]);

  const [horseReports, setHorseReports] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);

  console.log('horse id', horseList[horse].id);

  useEffect(() => {
    axios
      .get(`/horse-details/${horseList[horse].id}`)
      .then((response) => {
        console.log(response.data);
        setHorseDetails(response.data.horse);
        setHorseBehaviour(response.data.behaviours);
        setHorseReports(response.data.reports);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios.get(`/horse-behaviour/${horseList[horse].id}`)
    // .then((response) => {
    //   console.log(response.data);
    //   setHorseBehaviour(response.data.behaviours);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    // axios.get(`/horse-reports/${horseList[horse].id}`)
    // .then((response) => {
    //   console.log(response.data);
    //   setHorseReports(response.data.reports);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }, []);

  return (
    <div className="horse-details">
      <h3>
        {horseDetails.name}
        ,
        {' '}
        {horseDetails.mraNumber}
      </h3>
      <div className="horse-behaviours">
        <ul className="list-group list-group-horizontal">
          {horseBehaviour.map((behaviour, index) => (
            <li key={behaviour.id} className="list-group-item" id="behaviour-button">{behaviour.name}</li>
          ))}
        </ul>
        <br />
        <button type="button" className="btn btn-dark" onClick={() => setShowAlertModal(true)}>Add Alert</button>
        <AlertModal trigger={showAlertModal} setTrigger={setShowAlertModal} horse={horse} horseList={horseList} setHorseBehaviour={setHorseBehaviour} horseBehaviour={horseBehaviour} />
      </div>
      <div div className="horse-reports">
        <ul className="list-group list-group-flush" id="report">
          {horseReports.map((report) => (
            <li className="list-group-item">{report.report}</li>
          ))}
        </ul>
        <br />
        <div id="buttons">
          <button type="button" className="btn btn-dark" onClick={() => setShowReportModal(true)}>Add new report</button>
          <ReportModal trigger={showReportModal} setTrigger={setShowReportModal} horse={horse} horseList={horseList} setHorseReports={setHorseReports} />

          <button type="button" className="btn btn-dark" onClick={() => { setShowBillModal(true); }}>Create new bill</button>
          <BillModal trigger={showBillModal} setTrigger={setShowBillModal} horse={horse} horseList={horseList} owner={owner} ownerList={ownerList} />
        </div>

      </div>
    </div>
  );
};

export default HorseDetails;
