import React , { useState } from 'react';
import { IoCalendarClearOutline, IoSearchSharp } from "react-icons/io5";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import TextField from '@mui/material/TextField';


function ControlBar({setSearchID , setSearchStartDate, setSearchEndDate, setPage}) {

    const [ id , setID ] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleInputID = (event) => {
        setID(event.target.value);
    }

    const handleSearch = () => {
        setSearchID(id);

        if(startDate) {
            setSearchStartDate(new Date(startDate).toISOString());
        } else {
            setSearchStartDate(startDate);
        }
        if(endDate) {
            setSearchEndDate(new Date(endDate).toISOString());
        } else {
            setSearchEndDate(endDate)
        }
        setPage(1);
    }

    const handleClear = () => {
        setID("");
        setStartDate(null);
        setEndDate(null);
    }

    
    return (
        <div className='flex flex-col bg-white w-full h-full rounded-xl'>
            <div className='flex flex-row w-full px-10 mt-10 justify-between'>
                <div className='flex flex-col w-[32.5%] h-full'>
                    <div className='flex font-bold text-xl'>
                        ID
                    </div>
                    <div className='flex border border-opacity-50 rounded-md mt-3'>
                        <TextField id="outlined-basic" label="Search with ID" className='w-full' value={id} onChange={handleInputID}/>
                    </div>
                </div>
                <div className='flex flex-col w-[32.5%] h-full'>
                    <div className='flex font-bold text-xl'>
                        Form Date
                    </div>
                    <div className='flex w-full h-full py-3'>
                        <DateTimePicker slots={{openPickerIcon: IoCalendarClearOutline}} views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']} format='D/M/YYYY HH:mm:ss' className='flex w-full text-xl' label="Please select Form Date" value={startDate} onChange={setStartDate} maxDate={endDate}/>
                    </div>
                </div>
                <div className='flex flex-col w-[32.5%] h-full'>
                    <div className='flex font-bold text-xl'>
                        To Date
                    </div>
                    <div className='flex w-full h-full py-3'>
                    <DateTimePicker slots={{openPickerIcon: IoCalendarClearOutline}} format='D/M/YYYY HH:mm:ss' views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']} className='flex w-full text-xl' label="Please select To Date" value={endDate} onChange={setEndDate} minDate={startDate} />
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center mx-10 mt-10 mb-10'>
                <div className='flex text-md text-[#D91212] underline font-bold hover:cursor-pointer' onClick={handleClear}>
                    Clear Filter
                </div>
                <div className='flex flex-row bg-[#1F7B44] w-32 h-12 items-center justify-center text-white font-bold text-md rounded-md hover:cursor-pointer' onClick={handleSearch}>
                    <div className='flex text-xl items-center justify-center'>
                        <IoSearchSharp />&nbsp;
                    </div>
                    <div className='flex'>
                        Search
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlBar;