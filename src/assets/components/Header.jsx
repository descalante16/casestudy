import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Header = () => {
   
    const navigatehome= useNavigate();

    const handleLogoClick = () => {
      // Navigate to the desired page when the button is clicked
      navigatehome('/');
    };
    let [isOpen, setisOpen] = useState(false);
    return (
       
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:px-8 py-2 px-6 md:flex justify-between items-center bg-white'>
                
                <div className='flex text-2xl cursor-pointer items-center gap-2'>
                <img onClick={handleLogoClick} src="/src/assets/images/3.png" className='w-16 h-16'/>
                    <span onClick={handleLogoClick} className='font-bold text-emerald-900'>VEE Railway</span>
                </div>

                <div onClick={() => setisOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
                    {
                        isOpen ?  <img src='/public/x.svg' className='w-7 h-7'/> :  <img src='/public/bar_icon.svg' className='w-7 h-7'/>
                    }
                   
          
                </div>
                <ul className={`md:flex pl-9 md:pl-0 md:items-center 
                md:pb-0 pb-12 absolute md:static  bg-white duration-500 ease-in
                 md:z-auto z-[-1] left-0 w-full md:w-auto transition-all
                 ${isOpen ? 'top-20' : 'top-[-490px]'}`}>

                        <li >
                        <Link to="/" className="text-emerald-900 hover:text-orange-500 font-semibold text-xl mr-4">Home</Link>
                        </li>
                        <li>
                        <Link to="/trains" className="text-emerald-900 hover:text-orange-500 font-semibold text-xl mr-4">Trains</Link>
                        </li>
                        <li>
                        <Link to="/book" className="text-emerald-900 hover:text-orange-500 font-semibold text-xl mr-4">Book</Link>
                        </li>
                       <li>
                        <Link to="/cancel" className="text-emerald-900 hover:text-orange-500 font-semibold text-xl mr-4">Cancel</Link>
                        </li>
                        <li>
                        <Link to="/login" className="text-emerald-900 hover:text-orange-500 font-semibold text-xl mr-4">Login</Link>
                        </li>

                </ul>
              
            </div>
        </div>
    );
};

export default Header;