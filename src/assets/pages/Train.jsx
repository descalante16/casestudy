import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";


// const baseURL = "http://localhost/api/trainlist.php";

const Train = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get("http://localhost/api/trainlist.php")
        .then(res => 
            setData(res.data))
        .catch(err => 
                console.log(err));
    }, [])
        
       
      
    return (
        <div className='bg-orange-400 w-full h-full'>
        <Header/>
        <div className='trainlist p-5 pt-32 text-2xl font-bold ml-8 place-content-center'>
           <h1 className="text-emerald-900">Train List Available</h1>
        
        </div>
        <div className="flex place-content-center px-10 ">
           <table className="w-full mb-10">
            <thead className="bg-emerald-400 border-b-2 border-gray-200">
                <tr>
                <th className="w-28 p-3 text-sm font-bold tracking-wid text-left">#</th>
                <th className="w-26 p-3 text-sm font-bold tracking-wide text-left">Train Name</th>
                <th className="w-26 p-3 text-sm font-bold tracking-wide text-left">Source</th>
                <th className="w-26 p-3 text-sm font-bold tracking-wide text-left">Destination</th>
                <th className="w-30 p-3 text-sm font-bold tracking-wide  text-left">AC Fare</th>
                <th className="w-30 p-3 text-sm font-bold tracking-wide text-left">General Fare</th>
                <th className=" p-3 text-sm font-bold tracking-wide text-left">Weekdays Available</th>

                </tr>
            </thead>
            <tbody>
               {
                data.map((train, index) => {
                    return <tr key={index} className="bg-white ">
                    <td className="p-4 text-sky-600 font-semibold" >{train.TrainNumber}</td>
                    <td>{train.TrainName}</td>
                    <td>{train.Source}</td>
                    <td>{train.Destination}</td>
                    <td>{train.AC_Fare}</td>
                    <td>{train.General_Fare}</td>
                    <td>{train.WeekdaysAvailable}</td>

                    </tr>
                })
                
                }
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default Train;