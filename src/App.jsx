import Header from './assets/components/Header'
import BookButton from './assets/components/BookButton'
import './App.css'

function App() {
  

  return (
    <>
      <div className='App'>
      
        <Header/>
        <div className='bg-orange-400 w-full h-screen '>
    
        <h1 className='flex text-sky-50 max-sm:text-3xl md:text-5xl font-semibold justify-center place-content-center pt-40'>Welcome to VEE Express!</h1>
        <div className='flex text-sky-50 max-md:text-2xl md:text-3xl font-semibold pt-4 place-content-center'>Where your journey is our priority.</div>
        <div className='flex place-content-center pt-24'><BookButton></BookButton></div>
        </div>
        
        
      </div>
     
    </>
  )
}

export default App
