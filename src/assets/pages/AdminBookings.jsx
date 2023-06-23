import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';


function AdminBookings() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    const reservationStatus = prompt("RESERVATION STATUS : *RESERVED, *PENDING, *CANCELED):");

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
    <div>
    <AdminHeader/>

      <div className="flex justify-between items-center m-3 ">
        
        <div>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Search by TicketID"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="text-2xl font-bold">
          <h1>Passenger's Booking Information</h1>
        </div>
        <div>
          <Link to="/admin/dashboard">
            <button className="bg-dark text-gray-900 px-6 py-2 rounded-md text-lg">
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <div className="flex justify-center px-10">
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
              {searchResults.map((passenger, index) => (
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
      </div>
    </>
  );
}

export default AdminBookings;
