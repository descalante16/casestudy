import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';

const AdminReports = () => {
    const [acSeatsReport, setAcSeatsReport] = useState([]);
    const [generalSeatsReport, setGeneralSeatsReport] = useState([]);
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        fetchAcSeatsReport();
        fetchGeneralSeatsReport();
        fetchTrains();
    
      }, []);

      const fetchTrains = async () => {
        try {
          const response = await axios.get('http://localhost/api/trains.php');
          setTrains(response.data);
        } catch (error) {
          console.error('Error fetching trains data:', error);
        }
      };

      const fetchAcSeatsReport = async () => {
        try {
          const response = await axios.get('http://localhost/api/acseatsdata.php');
          setAcSeatsReport(response.data);
          console.log('Seats report loaded successfully!');
        } catch (error) {
          console.log(error);
        }
      };

      const fetchGeneralSeatsReport = async () => {
        try {
          const response = await axios.get('http://localhost/api/generalseatsdata.php');
          setGeneralSeatsReport(response.data);
          console.log('General Seats report loaded successfully!');
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className='bg-slate-700 h-screen'>
            <AdminHeader/>
            <div className="flex flex-wrap justify-evenly bg-slate-700">
  <div className="p-6 bg-slate-700">
    <h2 className="text-xl font-bold mb-4 text-slate-50">AC Seats Report</h2>
    <hr className="border border-t mb-4 border-slate-200" />

    <div className="overflow-x-auto">
      <table className="table-auto w-auto">
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
  <div className="p-6 bg-slate-700">
    <h2 className="text-xl font-bold mb-4 text-slate-50">General Seats Report</h2>
    <hr className="border border-t mb-4 border-slate-200" />

    <div className="overflow-x-auto">
      <table className="table-auto w-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-emerald-500">Train Number</th>
            <th className="border px-4 py-2 bg-emerald-500">Train Date</th>
            <th className="border px-4 py-2 bg-emerald-500">General Seats Count</th>
          </tr>
        </thead>
        <tbody>
          {generalSeatsReport.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-slate-50 bg-slate-600">{item.TrainNumber}</td>
              <td className="border px-4 py-2 text-slate-50 bg-slate-600">{item.TrainDate}</td>
              <td className="border px-4 py-2 text-slate-50 bg-slate-600">{item.GeneralSeatsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  <div className="p-6 bg-slate-700">
    <h2 className="text-xl font-bold mb-4 text-slate-50">Train List</h2>
    <hr className="border border-t mb-4 border-slate-200" />

    <div className="overflow-x-auto">
      <table className="table-auto w-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-emerald-500">Train Number</th>
            <th className="border px-4 py-2 bg-emerald-500">Train Name</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-slate-50 bg-slate-600">{item.TrainNumber}</td>
              <td className="border px-4 py-2 text-slate-50 bg-slate-600">{item.TrainName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

      
      </div>
      
    );
};

export default AdminReports;