import React from 'react';
import { IoCalendarClearOutline, IoSearchSharp } from "react-icons/io5";

function ControlBar() {
    return (
        <div className='flex flex-col bg-white w-full h-full rounded-xl'>
            <div className='flex flex-row w-full px-10 mt-10 justify-between'>
                <div className='flex flex-col w-[32.5%] h-full'>
                    <div className='flex font-bold text-xl'>
                        ID
                    </div>
                    <div className='flex border border-[#707070] border-opacity-50 rounded-md mt-3'>
                        <input type="text" className="rounded py-3 px-2 w-full font-bold focus:outline-none text-[#909090] text-xl" placeholder="Search with ID" />
                    </div>
                </div>
                <div className='flex flex-col w-[32.5%] h-full'>
                    <div className='flex font-bold text-xl'>
                        Form Date
                    </div>
                    <div className='flex flex-row border font-bold border-[#707070] border-opacity-50 rounded-md justify-between items-center py-3 px-2 text-[#909090] mt-3'>
                        <div className="flex rounded w-full ml-2 text-xl">
                            Please select Form Date
                        </div>
                        <div className='flex text-2xl font-bold mr-2'>
                            <IoCalendarClearOutline />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[32.5%] h-full'>
                    <div className='flex font-bold text-xl'>
                        Form Date
                    </div>
                    <div className='flex flex-row border font-bold border-[#707070] border-opacity-50 rounded-md justify-between items-center py-3 px-2 text-[#909090] mt-3'>
                        <div className="flex rounded w-full ml-2 text-xl">
                            Please select Form Date
                        </div>
                        <div className='flex text-2xl font-bold mr-2'>
                            <IoCalendarClearOutline />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center mx-10 mt-10 mb-10'>
                <div className='flex text-md text-[#D91212] underline font-bold'>
                    Clear Filter
                </div>
                <div className='flex flex-row bg-[#1F7B44] w-32 h-12 items-center justify-center text-white font-bold text-md rounded-md'>
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