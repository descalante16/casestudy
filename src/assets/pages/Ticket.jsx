import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Ticket = () => {
  const [cancelTicketId, setCancelTicketID] = useState('');
  const [statusTicketId, setStatusTicketId] = useState('');
  const [errorMessage, setCancelErrorMessage] = useState('');
  const [successMessage, setCancelSuccessMessage] = useState('');
  const [errorStatusMessage, setStatusErrorMessage] = useState('');
  const [successStatusMessage, setStatusSuccessMessage] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');


  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showTicketStatusModal, setShowTicketStatusModal] = useState(false);
  const [modalData, setModalData] = useState(null);


  const handleCancelTicketIdChange = (e) => {
    setCancelTicketID(e.target.value);
  };

  const handleStatusTicketIdChange = (e) => {
    setStatusTicketId(e.target.value);
  };

  const handleCancelFormSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost/api/cancel_ticket.php?ticketId=${cancelTicketId}`)
      .then((response) => {
        setModalData(response.data);
        setShowConfirmationModal(true);
        setCancelErrorMessage('');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setCancelErrorMessage(error.response.data);
        } else {
          setCancelErrorMessage('An unknown error occurred. Please try again.');
        }
        setCancelSuccessMessage('');
      });
  };

  const handleConfirmCancellation = () => {
    const cancellationData = {
      ticketId: cancelTicketId,
    };

    axios
      .delete('http://localhost/api/cancel_ticket.php', { data: cancellationData })
      .then((response) => {
        setCancelSuccessMessage(response.data);
        setCancelErrorMessage('');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setCancelErrorMessage(error.response.data);
        } else {
          setCancelErrorMessage('An unknown error occurred. Please try again.');
        }
        setCancelSuccessMessage('');
      });

    setShowConfirmationModal(false);
  };

  const handleCancelCancellation = () => {
    setShowConfirmationModal(false);
  };

  const handleStatusFormSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost/api/check_ticket_status.php?ticketId=${statusTicketId}`)
      .then((response) => {
        setTicketStatus(response.data);
        setStatusErrorMessage('');
        setShowTicketStatusModal(true);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setStatusErrorMessage(error.response.data);
        } else {
          setStatusErrorMessage('An unknown error occurred. Please try again.');
        }
        setTicketStatus('');
      });
  };

      // Inside the handleCloseTicketStatusModal function
    const handleCloseTicketStatusModal = () => {
      setShowTicketStatusModal(false);
    };

  const handleCancelClick = () => {
    setCancelTicketID('');
    setStatusErrorMessage('');
    setStatusSuccessMessage('');
    setTicketStatus('');
  };

  return (
    <div className="flex flex-col items-center h-screen p-6  bg-image">
      <Header />
      <div className="max-w-2xl w-full  flex flex-col md:flex-row mt-40">
        <div className="bg-slate-50  shadow-lg rounded-lg p-6 mb-4 md:mr-4 md:mb-0 w-full flex-grow ">
          <h1 className="text-lg md:text-2xl font-bold mb-6">Train Ticket Cancellation</h1>
          <form onSubmit={handleCancelFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="cancelTicketId" className="block mb-1">Ticket ID:</label>
              <input
                type="text"
                id="cancelTicketId"
                name="cancelTicketId"
                value={cancelTicketId}
                onChange={handleCancelTicketIdChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="submit"
                value="Cancel Ticket"
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              />
             
            </div>
          </form>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div>
        <div className="bg-slate-50 w-full shadow-lg rounded-lg p-6 flex-grow ">
          <h2 className="text-lg md:text-2xl font-bold mb-4">Check Ticket Status</h2>
          <form onSubmit={handleStatusFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="statusTicketId" className="block mb-1">Ticket ID:</label>
              <input
                type="text"
                id="statusTicketId"
                name="statusTicketId"
                value={statusTicketId}
                onChange={handleStatusTicketIdChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="submit"
                value="Check Status"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded cursor-pointer"
              />
             
            </div>
          </form>
          {successStatusMessage && <p className="text-green-500 mt-4">{successStatusMessage}</p>}
          {errorStatusMessage && <p className="text-red-500 mt-4">{errorStatusMessage}</p>}
        </div>
      </div>

      {showConfirmationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-slate-50 rounded-lg p-6">
          <div className="flex text-4xl items-center gap-2 justify-center ">
          <img src="/src/assets/images/3.png" className='w-16 h-16'/>
          <span className='font-bold text-emerald-900'>VEE Railway</span>

            </div>
            <h3 className="flex text-lg font-bold mt-2 justify-center items-center">Confirm Ticket Cancellation</h3>
            {modalData && (
              <div>
              <hr className="border-t-2  border-dashed border-gray-500 mx-auto mt-2 w-full mb-2"></hr>
                <p className="text-emerald-900 text-lg font-semibold">Ticket ID: {modalData.ticketId}</p>
                <p className="text-lg font-semibold">Passenger First Name: {modalData.passengerFirstName}</p>
                <p className="text-lg font-semibold">Passenger Last Name: {modalData.passengerLastName}</p>
                <p className="text-lg font-semibold">Source: {modalData.source}</p>
                <p className="text-lg font-semibold">Destination: {modalData.destination}</p>
                <p className="text-lg font-semibold">Reservation Status: {modalData.reservationStatus}</p>
                <hr className="border-t-2  border-dashed border-gray-500 mx-auto mt-2 w-full mb-2"></hr>

              </div>
            )}
            <p className="text-red-500 text-lg font-semibold">Are you sure you want to cancel the ticket with ID: {cancelTicketId}?</p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer mr-2"
                onClick={handleConfirmCancellation}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer"
                onClick={handleCancelCancellation}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showTicketStatusModal && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 ">
        <div className="bg-slate-50  rounded-lg p-4">
         <div className="flex text-3xl items-center gap-2">
          <img src="/src/assets/images/3.png" className='w-16 h-16'/>
          <span className='font-bold text-emerald-900'>VEE Railway</span>

            </div>

          <h3 className="flex text-2xl text-orange-800 font-bold mt-2 justify-center items-center">Ticket Status</h3>
          {ticketStatus ? (
            <div>
              <hr className="border-t-2  border-dashed border-gray-500 mx-auto mt-2 w-full mb-2"></hr>
             
              <p className="text-lg font-semibold">Reservation Status: <span className="text-emerald-800 font-bold">{ticketStatus.reservationStatus}</span></p>             
              <p className="text-lg font-semibold">Source: {ticketStatus.source}</p>
              <p className="text-lg font-semibold">Destination: {ticketStatus.destination}</p>
              <p className="text-lg font-semibold">Ticket ID: {ticketStatus.ticketId}</p>
              <p className="text-lg font-semibold">Train Number: {ticketStatus.trainNumber}</p>
              <p className="text-lg font-semibold">Category: {ticketStatus.category}</p>
              <hr className="border-t-2  border-dashed border-gray-500 mx-auto mt-2"></hr>

            </div>
          ) : (
            <p>No ticket found with ID: {statusTicketId}</p>
          )}
           <div className="flex justify-end mt-6">
            <button
              className="bg-gray-300 hover:bg-emerald-700 font-semibold text-emerald-900 px-4 py-2 rounded cursor-pointer"
              onClick={handleCloseTicketStatusModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Ticket;
