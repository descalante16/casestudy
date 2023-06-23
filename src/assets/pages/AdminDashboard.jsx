import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import Modal from 'react-modal';

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setDatamart] = useState([]);
  const [acSeatsReport, setAcSeatsReport] = useState([]);
  const [generalReport, setGeneralReport] = useState([]);
  const [passengerData, setPassengerData] = useState({
    totalPassenger: 0,
    acCount: 0,
    generalCount: 0
  });

  useEffect(() => {
    fetchPassengerData();
    fetchAcSeatsReport();

  }, []);

  const fetchPassengerData = async () => {
    try {
      const response = await axios.get('http://localhost/api/passenger_count.php');
      setPassengerData(response.data);
    } catch (error) {
      console.error('Error fetching passenger data:', error);
    }
  };

  const loadDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost/api/passenger_count.php');
      console.log('Dashboard data loaded successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAcSeatsReport = async () => {
    try {
      const response = await axios.get('http://localhost/api/acseatsdata.php');
      setAcSeatsReport(response.data);
      console.log('AC seats report loaded successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost/api/datamart.php');
      setDatamart(response.data);
      setShowModal(true);
      console.log('Data Mart loaded successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const downloadData = () => {
    const csvContent = "TrainNumber,Destination,Date,Passengers\n" + data.map(item => Object.values(item).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'datamart.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className='bg-slate-700 h-screen'>
      <AdminHeader />
      <div className="container p-6">
        <div className='flex justify-between'>
          <h1 className="text-2xl text-slate-200 font-bold mb-2">Dashboard</h1>
          <div className="text-center shadow-md">
            <button onClick={loadData} className="bg-emerald-700 p-2 font-semibold text-orange-50 mb-2 text-center">Load DataMart</button>
          </div>
        </div>
        <hr className="border border-t mb-4 border-slate-200" />
        <div className="flex">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-2 mb-4">
            <div className="bg-purple-200  p-8 shadow">
              <h2 className="text-lg  font-bold">Total Train</h2>
              <p className="text-xl ">10</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-2 mb-4">
            <div className="bg-blue-300 p-8 shadow">
              <h2 className="text-lg font-bold">Total Passengers</h2>
              <p className="text-xl">{passengerData.totalPassenger}</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-2 mb-4">
            <div className="bg-indigo-500  p-8 shadow">
              <h2 className="text-lg font-bold">Booked AC Category</h2>
              <p className="text-xl">{passengerData.acCount}</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-2 mb-4">
            <div className="bg-yellow-200  p-8 shadow">
              <h2 className="text-lg font-bold">Booked General Category </h2>
              <p className="text-xl">{passengerData.generalCount}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onRequestClose={closeModal} className="bg-slate-900 h-screen" contentLabel="Data Mart">
        <br />
        <p className='flex justify-center text-slate-100 font-bold text-2xl p-4'>DATA MART</p>
        <div className="flex items-center justify-center">
          <div className="modal w-1/2 h-1/2 bg-white rounded-lg shadow-lg p-8">
            <button className="modal-close bg-red-500 p-2 font-semibold text-lg rounded-lg w-24 absolute top-0 right-0 m-4" onClick={closeModal}>
              Close
            </button>
            <table className="w-full p-10">
              <thead>
                <tr>
                  <th className="p-3 text-sm font-bold">Train Number</th>
                  <th className="p-3 text-sm font-bold">Destination</th>
                  <th className="p-3 text-sm font-bold">Date</th>
                  <th className="p-3 text-sm font-bold">Passengers</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.TrainNumber}</td>
                      <td>{item.Destination}</td>
                      <td>{item.Date}</td>
                      <td>{item.Passengers}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button onClick={downloadData} className="bg-emerald-800 font-semibold text-white p-4 rounded-md text-center mt-4">Download Data Mart</button>
          </div>
        </div>
      </Modal>

      <div className=" p-6 bg-slate-700">
          <h2 className="text-xl font-bold mb-4 text-slate-50">AC Seats Report</h2>
          <hr className="border border-t mb-4 border-slate-200" />

          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-emerald-500">Train Number</th>
                <th className="border px-4 py-2 bg-emerald-500">Train Date</th>
                <th className="border px-4 py-2 bg-emerald-500">AC Seats Count</th>
              </tr>
            </thead>
            <tbody>
              {acSeatsReport.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-slate-50 bg-slate-600">{item.TrainNumber}</td>
                  <td className="border px-4 py-2 text-slate-50 bg-slate-600">{item.TrainDate}</td>
                  <td className="border px-4 py-2 text-slate-50 bg-slate-600">{item.ACSeatsCount}</td>
                </tr>
              ))}

            </tbody>
          </table>
           </div>
      </div>
    
  );
};

export default AdminDashboard;
