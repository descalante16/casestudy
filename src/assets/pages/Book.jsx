import React, { useState } from 'react';
import Modal from 'react-modal';

import axios from 'axios';
import Header from '../components/Header';

const Book = () => {
  const [TrainNumber, setTrainNumber] = useState('');
  const [TrainDate, setTrainDate] = useState('');
  const [Passenger_Fname, setPassengerFname] = useState('');
  const [Passenger_Lname, setPassengerLname] = useState('');
  const [Age, setAge] = useState('');
  const [Sex, setSex] = useState('');
  const [Address, setAddress] = useState('');
  const [Category, setCategory] = useState('');

  const [trainNumberError, setTrainNumberError] = useState('');
  const [trainDateError, setTrainDateError] = useState('');
  const [passengerFnameError, setPassengerFnameError] = useState('');
  const [passengerLnameError, setPassengerLnameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [sexError, setSexError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      
    },
  };


const handleSubmit = (event) => {
    event.preventDefault();
    

      const formData = new FormData();
      formData.append('TrainNumber', TrainNumber);
      formData.append('TrainDate', TrainDate);
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
          
        })
        .catch(function (error) {
          console.log(error);
        });

        // Validate trainNumber field
      if (TrainNumber === '') {
        setTrainNumberError('Please select a train number');
        return;
      }

      // Validate trainDate field
      if (TrainDate === '') {
        setTrainDateError('Please select a date');
        return;
      }

      // Validate passengerFname field
      if (Passenger_Fname === '') {
        setPassengerFnameError('Please enter passenger first name');
        return;
      }
      // Validate passengerLname field
      if (Passenger_Lname === '') {
        setPassengerLnameError('Please enter passenger last name');
        return;
      }

      // Validate age field
      if (Age === '') {
        setAgeError('Please enter age');
        return;
      }
        // Validate sex field
      if (Sex === '') {
        setSexError('Please select sex');
        return;
      }

      // Validate address field
      if (Address === '') {
        setAddressError('Please enter address');
        return;
      }
       // Validate category field
      if (Category === '') {
        setCategoryError('Please select category');
        return;
      }
      const booking = {
        TrainNumber,
        TrainDate,
        Passenger_Fname,
        Passenger_Lname,
        Age,
        Sex,
        Address,
        Category,
      };
      setBookingDetails(booking);
      setBookingSuccess(true);

      // Reset all error messages
      setTrainNumberError('');
      setTrainDateError('');
      setPassengerFnameError('');
      setPassengerLnameError('');
      setAgeError('');
      setSexError('');
      setAddressError('');
      setCategoryError('');
      

    };
 
  return (
    
    <div className='bg-orange-400 w-full h-full '>
    
      <Header />
      <div className='book p-2 pt-28 text-2xl font-bold '>
        <h1 className='text-emerald-900 flex place-content-center'>Booking Form</h1>
      </div>
      <div className='flex place-content-center '>
        <div className='flex bg-white bg-opacity-20  rounded-xl w-100 mb-10 justify-center items-center place-content-center'>
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
                    placeholder='Ex: 8001'
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
                {trainNumberError && <p className='text-red-500 text-sm'>{trainNumberError}</p>}
                {trainDateError && <p className='text-red-500 text-sm'>{trainDateError}</p>}

            </div>

            <div className='mb-4'>
              <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='TrainDate'>
                 Date:
              </label>
              <input
                id="TrainDate" type="date"
                name='TrainDate'
                placeholdertext='Select a date'
                onChange={(e) => setTrainDate(e.target.value)}

                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
                {trainDateError && <p className='text-red-500 text-sm'>{trainDateError}</p>}

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
              placeholder='Ex: Taylor'
              onChange={(e) => setPassengerFname(e.target.value)}
              required
            />
              {passengerFnameError && <p className='text-red-500 text-sm'>{passengerFnameError}</p>}

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
              placeholder='Ex: Swift'
              onChange={(e) => setPassengerLname(e.target.value)}
              required
            />
              {passengerLnameError && <p className='text-red-500 text-sm'>{passengerLnameError}</p>}

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
              placeholder='Ex: 18'
              onChange={(e) => setAge(e.target.value)}
              required
            />
              {ageError && <p className='text-red-500 text-sm'>{ageError}</p>}

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
            {sexError && <p className='text-red-500 text-sm'>{sexError}</p>}

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
              {addressError && <p className='text-red-500 text-sm'>{addressError}</p>}

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
            {categoryError && <p className='text-red-500 text-sm'>{categoryError}</p>}

          </div>

          <div className='flex justify-center'>
            <button onClick={handleSubmit}
              className='px-4 py-2 font-bold text-white bg-emerald-700 rounded-lg hover:bg-emerald-900 focus:outline-none focus:bg-orange-500'
              type='submit'
            >
              Submit
            </button>
          </div>
         
        </form>
      </div>
      </div>
      <Modal isOpen={bookingSuccess}
       style={customStyles}
       contentLabel="Example Modal"
       >
        <div className='modal-content w-96 h-96'>
          <h2 className='font-semibold text-lg text-green-600'>Ticket Booked Successfully</h2>
          {bookingDetails && (
            <div className='booking-details'>
              <p className='font-semibold'>Train Number: {bookingDetails.TrainNumber}</p>
              <p className='font-semibold'>Train Date: {bookingDetails.TrainDate}</p>
              <p className='font-semibold'>Passenger Name: {bookingDetails.Passenger_Fname} {bookingDetails.Passenger_Lname}</p>
              <p className='font-semibold'>Age: {bookingDetails.Age}</p>
              <p className='font-semibold'>Sex: {bookingDetails.Sex}</p>
              <p className='font-semibold'>Address: {bookingDetails.Address}</p>
              <p className='font-semibold'>Category: {bookingDetails.Category}</p>
            </div>
          )}
          <div className="flex gap-y-1.5	">
          <button
            type='button'
            className='close-button mr-2 mt-40 p-1 rounded-md bg-red-500 w-24	font-medium border-solid border-2 border-slate-100'
            onClick={() => setBookingSuccess(false)}
          >
            Close
          </button>
          <button
            type='button'
            className='proceed-button p-1 rounded-md w-full bg-emerald-500	font-medium mt-40 border-solid border-2 border-slate-100	'
            onClick={() => {
              // Proceed with the payment logic
              alert('Proceeding with payment...');
            }}
          >
            Proceed to Payment
          </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Book;
