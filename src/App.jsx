import Header from './assets/components/Header'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home';
import Train from './assets/pages/Train';
import Book from './assets/pages/Book';
import Cancel from './assets/pages/Cancel';
import Login from './assets/pages/Login';
  
const App = () => {

  return (
    <>
   
    <BrowserRouter>
      <div className='App bg-color'>

        <Header/>
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route path="/trains" element={<Train/>} />
          <Route path="/book" element={<Book/>} />
          <Route path="/cancel" element={<Cancel/>} />
          <Route path="/login" element={<Login/>} />

        </Routes>
       
    
      </div>
      </BrowserRouter>
   
    </>
  )
}

export default App
