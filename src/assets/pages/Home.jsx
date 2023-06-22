import Header from "../components/Header";
import BookButton from "../components/BookButton";
import { useNavigate } from 'react-router-dom';
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
    
        <h1 className='flex text-amber-100 max-sm:text-2xl md:text-6xl font-bold justify-center place-content-center pt-40'>Welcome to VEE Railway!</h1>
        <div className='flex text-sky-50 max-md:text-1xl md:text-4xl font-semibold pt-4 place-content-center italic'>Your journey is our priority.</div>
        <div onClick={handleClick} className='flex place-content-center pt-24'><BookButton></BookButton></div>
    
    </div>
    </div>
    
    );
};

export default Home;