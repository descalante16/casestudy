
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';

function AdminTrains() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost/api/trainlist.php')
      .then((res) => setTrains(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateTrain = (trainNumber) => {
    const destination = prompt('ENTER NEW DESTINATION:');
    const acFare = prompt('ENTER NEW AC FARE:');
    const generalFare = prompt('ENTER NEW GEN FARE:');

    if (destination && acFare && generalFare) {
      axios
        .put('http://localhost/api/updateTrain.php', {
          trainNumber,
          destination,
          acFare,
          generalFare,
        })
        .then((res) => {
          console.log(`Train with number ${trainNumber} has been updated.`);
          // Perform any necessary updates in the UI after a successful update
        })
        .catch((err) => {
          console.log(`Failed to update train with number ${trainNumber}.`, err);
        });
    }
  };

  return (
    <div className="container mx-auto bg-slate-700">
        <AdminHeader/>
      <div className="trainlist pt-3 text-2xl font-bold ml-8 text-center">
        <h1 className='mb-4'>Train List</h1>
      </div>
      <div className="flex justify-center px-10">
        <table className="w-full mb-10 border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-sm font-bold">Train Number</th>
              <th className="p-3 text-sm font-bold">Train Name</th>
              <th className="p-3 text-sm font-bold">Source</th>
              <th className="p-3 text-sm font-bold">Destination</th>
              <th className="p-3 text-sm font-bold">AC Fare </th>
              <th className="p-3 text-sm font-bold">General Fare </th>
              <th className="p-3 text-sm font-bold">Weekdays Available</th>
              <th className="p-3 text-sm font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, index) => (
              <tr
                key={train.TrainNumber}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              >
                <td className="p-3">{train.TrainNumber}</td>
                <td className="p-3">{train.TrainName}</td>
                <td className="p-3">{train.Source}</td>
                <td className="p-3">{train.Destination}</td>
                <td className="p-3">₱{train.AC_Fare}</td>
                <td className="p-3">₱{train.General_Fare}</td>
                <td className="p-3">{train.WeekdaysAvailable}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleUpdateTrain(train.TrainNumber)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-base"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTrains;
