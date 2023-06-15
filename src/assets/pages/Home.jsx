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
        <Header/>
        <div className='bg-orange-400 w-full h-screen '>
    
    <h1 className='flex text-sky-50 max-sm:text-3xl md:text-5xl font-semibold justify-center place-content-center pt-40'>Welcome to 
    <div className="text-emerald-900 ml-2 font-bold text">VEE Railway!</div></h1>
    <div className='flex text-sky-50 max-md:text-2xl md:text-3xl font-semibold pt-4 place-content-center italic'>Your journey is our priority.</div>
    <div onClick={handleClick} className='flex place-content-center pt-24'><BookButton></BookButton></div>
    
    </div>
    </div>
    
    );
};

export default Home;