import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';


function AdminBookings() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [passengersPerPage] = useState(5);

  // Get current passengers
  const indexOfLastPassenger = currentPage * passengersPerPage;
  const indexOfFirstPassenger = indexOfLastPassenger - passengersPerPage;
  const currentPassengers = searchResults.slice(indexOfFirstPassenger, indexOfLastPassenger);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios
      .get("http://localhost/api/passenger.php")
      .then(res => {
        setData(res.data);
        setSearchResults(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleUpdateBooking = (ticketId) => {
    const reservationStatus = prompt("Update Passenger Reservation Status to Confirmed.");

    if (reservationStatus) {
      axios
        .put("http://localhost/api/update-booking.php", { ticketId, reservationStatus })
        .then(res => {
          console.log(`Booking with ticket ID ${ticketId} has been updated.`);
          // Perform any necessary updates in the UI after a successful update
        })
        .catch(err => {
          console.log(`Failed to update booking with ticket ID ${ticketId}.`, err);
        });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const results = data.filter(passenger => passenger.TicketID.includes(event.target.value));
    setSearchResults(results);
  };

  return (
    <>
    <div className='bg-slate-700 h-screen'>
    <AdminHeader/>

    <div className="flex flex-wrap justify-between items-center m-3">
    <div className="w-full sm:w-auto ">
    <Link to="/admin/dashboard">
      <button className="bg-dark text-white px-10 py-2 rounded-md text-lg">Back</button>
    </Link>
  </div>
  <div className="w-full sm:w-auto">
    <input
      type="text"
      className="p-2 mt-4 mb-2 mx-5  sm:ml-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
      placeholder="Search by TicketID"
      value={searchTerm}
      onChange={handleSearch}
    />
  </div>
  
  
</div>
<div className="text-2xl font-bold">
    <h1 className="flex justify-center text-slate-50 ml-5">Passenger's Booking Information</h1>
  </div>
<div className="m-10 mt-5 mb-0">
  <div className="flex justify-center">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-sm font-bold">#</th>
            <th className="p-3 text-sm font-bold">Train Number</th>
            <th className="p-3 text-sm font-bold">Train Date</th>
            <th className="p-3 text-sm font-bold">First Name</th>
            <th className="p-3 text-sm font-bold">Last Name</th>
            <th className="p-3 text-sm font-bold">Age</th>
            <th className="p-3 text-sm font-bold">Sex</th>
            <th className="p-3 text-sm font-bold">Address</th>
            <th className="p-3 text-sm font-bold">Reservation Status</th>
            <th className="p-3 text-sm font-bold">Category</th>
            <th className="p-3 text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPassengers.map((passenger, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="p-3">{passenger.TicketID}</td>
              <td className="p-3">{passenger.TrainNumber}</td>
              <td className="p-3">{passenger.TrainDate}</td>
              <td className="p-3">{passenger.Passenger_Fname}</td>
              <td className="p-3">{passenger.Passenger_Lname}</td>
              <td className="p-3">{passenger.Age}</td>
              <td className="p-3">{passenger.Sex}</td>
              <td className="p-3">{passenger.Address}</td>
              <td className="p-3">{passenger.ReservationStatus}</td>
              <td className="p-3">{passenger.Category}</td>
              <td className="p-3">
                <button
                  onClick={() => handleUpdateBooking(passenger.TicketID)}
                  className="bg-gray-900 text-white px-4 py-2 rounded-md text-lg"
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


              {/* Pagination */}
          <div className="flex justify-center mt-4 ">
            {Array.from({ length: Math.ceil(searchResults.length / passengersPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`bg-gray-200 mb-10 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-1 rounded ${
                  currentPage === index + 1 ? 'bg-gray-400' : ''
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
      </div>
      </div>
    </>
  );
}

export default AdminBookings;
