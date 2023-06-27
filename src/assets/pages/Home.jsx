import Header from "../components/Header";
import BookButton from "../components/BookButton";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
const Home = () => {
    const navigate= useNavigate();

    const handleClick = () => {
      // Navigate to the desired page when the button is clicked
      navigate('/book');
    };
    return (
        <div>
        
        <div className='bg-image w-full h-screen '>
        <Header/>
    
        <h1 className='flex font-sans text-amber-100 max-sm:text-2xl md:text-6xl font-bold justify-center place-content-center pt-40'>Welcome to VEE Railway!</h1>
        <div className='flex text-sky-50 max-md:text-1xl md:text-4xl font-semibold pt-4 place-content-center italic'>Your journey is our priority.</div>
        <div onClick={handleClick} className='flex justify-center mt-5 md:pt-24 md:mb-20'><BookButton></BookButton></div>
        <div className="flex flex-col sm:flex-row justify-around">
  <div className="flex-col mb-8 sm:mb-0">
    <div className="flex justify-center text-orange-300 text-2xl md:text-5xl font-sans font-bold">10</div>
    <div className="flex justify-center text-orange-100 text-lg md:text-3xl font-sans font-semibold">Trains Available</div>
  </div>
  <div className="flex-col mb-8 sm:mb-0">
    <div className="flex justify-center text-orange-300 text-2xl md:text-5xl font-bold">
      CDO <span><FontAwesomeIcon icon={faArrowsLeftRight} className="text-orange-300 m-2 md:text-3xl" style={{ fontSize: '30px' }} /></span><div>Davao</div>
    </div>
    <div className="flex justify-center text-orange-100  text-lg md:text-3xl font-semibold">Travel Around</div>
  </div>
  <div className="flex-col">
    <div className="flex justify-center text-orange-300 text-2xl md:text-5xl font-bold">
      <FontAwesomeIcon icon={faClock} className="text-orange-300 mr-2 mt-2" style={{ fontSize: '40px',  }} />
      <div>9AM - 9PM</div>
    </div>
    <div className="flex justify-center text-orange-100 text-lg md:text-3xl font-semibold">Time Schedule</div>
  </div>
</div>

    
    </div>
    </div>
    
    );
};

export default Home;