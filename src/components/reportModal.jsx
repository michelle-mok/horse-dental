import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportModal = ({
  trigger, setTrigger, horseList, horse, setHorseReports,
}) => {
  const [problems, setProblems] = useState([]);
  const [currentReport, setCurrentReport] = useState('');

  const addCurrentReport = () => {
    console.log('insde addcurrentreport', currentReport);
    console.log('horse id', horseList[horse].id);
    axios
      .post('/add-new-report', {
        newReport: currentReport,
        horseId: horseList[horse].id,
      })
      .then((response) => {
        console.log(response.data);
        setHorseReports();
      })
      .catch((error) => error);
  };

  useEffect(() => {
    axios
      .get('/horse-problems')
      .then((response) => {
        console.log(response.data.problems);
        setProblems(response.data.problems);
      });
  }, []);

  if (trigger) {
    console.log('current report', currentReport);
    return (
      <div className="report-modal">
        <div className="modal-content">
          <button type="button" className="close-btn" onClick={() => setTrigger(false)}>&times;</button>
          <h3>New Report</h3>
          <textarea rows="5" cols="60" placeholder="enter details here..." name="report" value={currentReport} onChange={(event) => { setCurrentReport(event.target.value); }} />
          <br />

          <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
            {problems.map((problem) => (
              <>
                <input type="checkbox" className="btn-check" id={problem.id} value={problem.id} autoComplete="off" />
                <label className="btn btn-outline-dark" htmlFor={problem.id}>{problem.name}</label>
              </>
            ))}
          </div>
          <br />
          <button type="button" className="btn btn-dark" onClick={addCurrentReport}>Submit </button>
        </div>
      </div>
    );
  }
  return '';
};
export default ReportModal;
