import Header from "../components/Header";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function convertToMySQLDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const mysqlDate = `${year}-${month}-${day}`;
    return mysqlDate;
  }


const Book = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedDate) {
          const convertedDate = convertToMySQLDate(selectedDate);
          // Use the converted MySQL date (stored in the `convertedDate` variable) in your form submission or API call
          console.log('Submitted date:', convertedDate);
        }
      };
    return (
        <div className='bg-orange-400 w-full h-full '>

        <Header/>
        <div className='book p-5 pt-28 text-2xl font-bold ml-8 '>
           <h1 className="text-emerald-900 flex place-content-center">Booking Form</h1>
        
        </div>
        <div className="flex ">
        <form onSubmit={handleSubmit} class="max-w-lg md:w-lg mx-auto mb-10">
        <div className="flex ">
        <div class="mr-2 mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="trainNumber">Train Number:</label>
            <select class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="trainNumber" name="trainNumber" required>
            <option value="" disabled selected>Select Train Number</option>
            <option value="8001">8001</option>
            <option value="8002">8002</option>
            <option value="8003">8003</option>
            <option value="8004">8004</option>
            <option value="8005">8005</option>
            <option value="8006">8006</option>
            <option value="8007">8007</option>
            <option value="8008">8008</option>
            <option value="8009">8009</option>
            <option value="8010">8010</option>

            </select>        
            </div>
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="trainDate">Train Date:</label>
            <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
        </div>
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="passengerFname">Passenger First Name:</label>
            <input class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="passengerFname" name="passengerFname" required/>
        </div>
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="passengerLname">Passenger Last Name:</label>
            <input class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="passengerLname" name="passengerLname" required/>
        </div>
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="age">Age:</label>
            <input class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" id="age" name="age" required/>
        </div>
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="sex">Sex:</label>
            <select class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="sex" name="sex" required>
            <option value="" disabled selected>Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>
        </div>
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="address">Address:</label>
            <textarea class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="address" name="address" rows="3" required></textarea>
        </div>
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="category">Category:</label>
            <select class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="category" name="category" required>
            <option value="" disabled selected>Select Category</option>
            <option value="AC">AC</option>
            <option value="General">General</option>
            </select>
        </div>
        <div class="flex justify-center">
            <button class="px-4 py-2 font-bold text-white bg-emerald-700 rounded-lg hover:bg-emerald-900 focus:outline-none focus:bg-orange-500" type="submit">Book Now</button>
        </div>
        </form>


        </div>
        </div>
        
    );
};

export default Book;
