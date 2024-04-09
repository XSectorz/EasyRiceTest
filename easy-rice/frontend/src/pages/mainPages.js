
import React , { useState } from 'react';
import NavBar from '../components/navbar';
import CreateInspectionButton from '../components/createButton';
import ControlBar from '../components/controlBar';
import TableData from '../components/tableData';

function MainPage() {
    
    const [ searchID , setSearchID ] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div className=" bg-[#FAFAFA] h-screen">
            <div className='flex flex-col w-full'>
                <div className='flex'>
                    <NavBar/>
                </div>
                <div className='flex flex-col mt-10'>
                    <div className='flex items-center justify-end'>
                        <CreateInspectionButton/>
                    </div>
                </div>
                <div className='flex flex-col mt-10 items-center justify-center mx-36'>
                    <ControlBar setSearchID={setSearchID} setSearchStartDate={setStartDate} setSearchEndDate={setEndDate}/>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center mx-36 mt-10'>
                <TableData searchID={searchID} startDate={startDate} endDate={endDate}/>
            </div>
        </div>
    );

}

export default MainPage;