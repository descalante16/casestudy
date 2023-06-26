import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home';
import Train from './assets/pages/Train';
import Book from './assets/pages/Book';
import Ticket from './assets/pages/Ticket';
import Login from './assets/pages/Login';
import AdminDashboard from './assets/pages/AdminDashboard';
import AdminHome from './assets/pages/AdminHome';
import AdminTrains from './assets/pages/AdminTrains';
import AdminBookings from './assets/pages/AdminBookings';
import AdminReports from './assets/pages/AdminReports';
  
const App = () => {

  return (
    <>
   
    <BrowserRouter>
      <div className='App bg-color'>

        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route path="/trains" element={<Train/>} />
          <Route path="/book" element={<Book/>} />
          <Route path="/ticket" element={<Ticket/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/home" element={<AdminHome/>} />
          <Route path="/admin/trains" element={<AdminTrains/>} />
          <Route path="/admin/bookings/passenger" element={<AdminBookings/>} />
          <Route path="/admin/reports" element={<AdminReports/>} />


        </Routes>
       
    
      </div>
      </BrowserRouter>
   
    </>
  )
}

export default App
