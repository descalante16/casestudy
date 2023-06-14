import { useState } from 'react';

const Header = () => {
    let Links = [
        {name: 'Home', link: '/'},
        {name: 'Trains', link: '/trains'},
        {name: 'Book', link: '/book/ticket'},
        {name: 'Cancel', link: '/cancel/ticket'},
        {name: 'Login', link: '/login'},

    ]

    let [isOpen, setisOpen] = useState(false);
    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:px-8 py-2 px-6 md:flex justify-between items-center bg-white'>
                
                <div className='flex text-2xl cursor-pointer items-center gap-2'>
                <img src="/src/assets/images/3.png" className='w-16 h-16'/>
                    <span className='font-bold'>VEE Railway</span>
                </div>

                <div onClick={() => setisOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
                    {
                        isOpen ?  <img src='/public/x.svg' className='w-7 h-7'/> :  <img src='/public/bar_icon.svg' className='w-7 h-7'/>
                    }
                   
          
                </div>
                <ul className={`md:flex pl-9 md:pl-0 md:items-center 
                md:pb-0 pb-12 absolute md:static  bg-white duration-500 ease-in
                 md:z-auto z-[-1] left-0 w-full md:w-auto transition-all
                 ${isOpen ? 'top-14' : 'top-[-490px]'}`}>

                    {
                        Links.map(link => (
                        // eslint-disable-next-line react/jsx-key
                        <li className='font-semibold my-7 md:my-0 md:ml-8'>
                            <a href='/'>{link.name}
                            </a>
                        </li>))
                    }


                </ul>

            </div>
        </div>
    );
};

export default Header;