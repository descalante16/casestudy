import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Header from '../components/Header';




  
const Book = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [TrainNumber, setTrainNumber] = useState('');
  const [Passenger_Fname, setPassengerFname] = useState('');
  const [Passenger_Lname, setPassengerLname] = useState('');
  const [Age, setAge] = useState('');
  const [Sex, setSex] = useState('');
  const [Address, setAddress] = useState('');
  const [Category, setCategory] = useState('');

const handleSubmit = (event) => {
    event.preventDefault();
    

      const formData = new FormData();
      formData.append('TrainNumber', TrainNumber);
      formData.append('TrainDate', selectedDate);
      formData.append('Passenger_Fname', Passenger_Fname);
      formData.append('Passenger_Lname', Passenger_Lname);
      formData.append('Age', Age);
      formData.append('Sex', Sex);
      formData.append('Address', Address);
      formData.append('Category', Category);

      axios
        .post('http://localhost/api/bookpost.php', formData)
        .then(function (response) {
          console.log(response);
          alert('You have successfully booked a ticket.');
        })
        .catch(function (error) {
          console.log(error);
        });
    };
     
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

  
  return (
    
    <div className='bg-orange-400 w-full h-full '>
      {/* Your Header component */}
      <Header />

      <div className='book p-2 pt-28 text-2xl font-bold '>
        <h1 className='text-emerald-900 flex place-content-center'>Booking Form</h1>
      </div>

      <div className='flex place-content-center '>
        <div className='flex bg-white bg-opacity-20 drop-shadow-lg rounded-xl w-100 mb-10 justify-center items-center place-content-center'>
        <form onSubmit={handleSubmit} className='p-5 max-w-lg md:w-lg mx-auto mb-5'>
          <div className='flex'>
            <div className='mr-2 mb-4'>
              <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='trainNumber'>
                Train Number:
              </label>
              <select
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='trainNumber'
                name='trainNumber'
                value={TrainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                required >
                <option disabled>Select Train Number</option>
                <option value='8001'>8001</option>
                <option value='8002'>8002</option>
                <option value='8003'>8003</option>
                <option value='8004'>8004</option>
                <option value='8005'>8005</option>
                <option value='8006'>8006</option>
                <option value='8007'>8007</option>
                <option value='8008'>8008</option>
                <option value='8009'>8009</option>
                <option value='8010'>8010</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='TrainDate'>
                Train Date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                 dateFormat="yyyy/MM/dd"
                placeholderText='Select a date'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='passengerFname'>
              Passenger First Name:
            </label>
            <input
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='text'
              id='passengerFname'
              name='passengerFname'
              value={Passenger_Fname}
              onChange={(e) => setPassengerFname(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='passengerLname'>
              Passenger Last Name:
            </label>
            <input
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='text'
              id='passengerLname'
              name='passengerLname'
              value={Passenger_Lname}
              onChange={(e) => setPassengerLname(e.target.value)}
              required
            />
          </div>
          <div className='flex'>
          <div className='mb-4 mr-4  w-auto'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='age'>
              Age:
            </label>
            <input
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='number'
              id='age'
              name='age'
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className='mb-4 w-auto'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='sex'>
              Sex:
            </label>
            <select
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='sex'
              name='sex'
              value={Sex}
              onChange={(e) => setSex(e.target.value)}
              required>
              <option disabled>Select Sex</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
          </div>

          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='address'>
              Address:
            </label>
            <textarea
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='address'
              name='address'
              rows='3'
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <div className='mb-4'>
            <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='category'>
              Category:
            </label>
            <select
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='category'
              name='category'
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option disabled>Select Category</option>
              <option value='AC'>AC</option>
              <option value='General'>General</option>
            </select>
          </div>

          <div className='flex justify-center'>
            <button onClick={handleSubmit}
              className='px-4 py-2 font-bold text-white bg-emerald-700 rounded-lg hover:bg-emerald-900 focus:outline-none focus:bg-orange-500'
              type='submit'
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Book;
