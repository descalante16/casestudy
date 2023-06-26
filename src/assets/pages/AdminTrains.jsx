import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';

function AdminTrains() {
  const [trains, setTrains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [trainsPerPage] = useState(5);

  const [newTrain, setNewTrain] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    acFare: '',
    generalFare: '',
    weekdaysAvailable: ''
  });

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

  const handleDeleteTrain = (trainNumber) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this train?');

    if (shouldDelete) {
      axios
        .delete(`http://localhost/api/deleteTrain.php?trainNumber=${trainNumber}`)
        .then((res) => {
          console.log(`Train with number ${trainNumber} has been deleted.`);
          // Perform any necessary updates in the UI after a successful deletion
          setTrains((prevTrains) => prevTrains.filter((train) => train.TrainNumber !== trainNumber));
        })
        .catch((err) => {
          console.log(`Failed to delete train with number ${trainNumber}.`, err);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTrain((prevTrain) => ({
      ...prevTrain,
      [name]: value
    }));
  };

  const handleAddTrain = () => {
    if (
      newTrain.trainNumber &&
      newTrain.trainName &&
      newTrain.source &&
      newTrain.destination &&
      newTrain.acFare &&
      newTrain.generalFare &&
      newTrain.weekdaysAvailable
    ) {
      axios
        .post('http://localhost/api/addTrain.php', newTrain)
        .then((res) => {
          console.log('Train added successfully.');
          // Perform any necessary updates in the UI after a successful addition
          setTrains((prevTrains) => [newTrain, ...prevTrains]);
          setNewTrain({
            trainNumber: '',
            trainName: '',
            source: '',
            destination: '',
            acFare: '',
            generalFare: '',
            weekdaysAvailable: ''
          });
        })
        .catch((err) => {
          console.log('Failed to add train.', err);
        });
    }
  };

  const indexOfLastTrain = currentPage * trainsPerPage;
  const indexOfFirstTrain = indexOfLastTrain - trainsPerPage;
  const currentTrains = trains.slice(indexOfFirstTrain, indexOfLastTrain);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" bg-slate-700 ">
        <AdminHeader/>
      <div className="trainlist pt-3 text-2xl font-bold  text-center">
        <h1 className='text-white mb-3'>Train List</h1>
      </div>
      <div className="flex justify-center px-10">
  <div className="w-full overflow-x-auto">
    <table className="w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-sm font-bold">Train Number</th>
          <th className="p-3 text-sm font-bold">Train Name</th>
          <th className="p-3 text-sm font-bold">Source</th>
          <th className="p-3 text-sm font-bold">Destination</th>
          <th className="p-3 text-sm font-bold">AC Fare</th>
          <th className="p-3 text-sm font-bold">General Fare</th>
          <th className="p-3 text-sm font-bold">Weekdays Available</th>
          <th className="p-3 text-sm font-bold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentTrains.map((train, index) => (
          <tr key={train.TrainNumber} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
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
                className="bg-gray-800 text-white px-4 py-2 rounded-md text-base mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteTrain(train.TrainNumber)}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-base"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      {/* Pagination */}
      <ul className="flex justify-end pr-10 mt-4">
        {Array.from({ length: Math.ceil(trains.length / trainsPerPage) }).map((_, index) => (
          <li key={index}>
            <button
              className={`bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-1 rounded ${
                currentPage === index + 1 ? 'bg-gray-400' : ''
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center px-10">
        <div className="mb-6 w-full ">
          <h2 className="text-lg font-bold mb-2 mt-3 text-white">Add Train</h2>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label htmlFor="trainNumber" className="block text-sm text-white font-bold mb-2">
                Train Number
              </label>
              <input
                type="text"
                id="trainNumber"
                name="trainNumber"
                value={newTrain.trainNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label htmlFor="trainName" className="block text-white text-sm font-bold mb-2">
                Train Name
              </label>
              <input
                type="text"
                id="trainName"
                name="trainName"
                value={newTrain.trainName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label htmlFor="source" className="block text-white text-sm font-bold mb-2">
                Source
              </label>
              <input
                type="text"
                id="source"
                name="source"
                value={newTrain.source}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label htmlFor="destination" className="block text-white text-sm font-bold mb-2">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={newTrain.destination}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label htmlFor="acFare" className="block text-white text-sm font-bold mb-2">
                AC Fare
              </label>
              <input
                type="text"
                id="acFare"
                name="acFare"
                value={newTrain.acFare}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label htmlFor="generalFare" className="block text-white text-sm font-bold mb-2">
                General Fare
              </label>
              <input
                type="text"
                id="generalFare"
                name="generalFare"
                value={newTrain.generalFare}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <label htmlFor="weekdaysAvailable" className="block text-white text-sm font-bold mb-2">
                Weekdays Available
              </label>
              <input
                type="text"
                id="weekdaysAvailable"
                name="weekdaysAvailable"
                value={newTrain.weekdaysAvailable}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleAddTrain}
              className="bg-emerald-800 text-white px-4 py-2 rounded-md text-base"
            >
              Add Train
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTrains;