
import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';

function CreateInspectionButton() {
    return(
        <Link to="/create" className='flex flex-row bg-[#1F7B44] w-52 h-12 items-center justify-center text-white font-bold text-md rounded-md mx-36'>
            <div className='flex text-xl items-center justify-center'>
                <AiOutlinePlus />&nbsp;
            </div>
            <div className='flex'>
                Creation Inspection
            </div>
        </Link>
    );
}

export default CreateInspectionButton;
