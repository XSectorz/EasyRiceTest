
import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";

function CreateInspectionButton() {
    return(
        <div className='flex flex-row bg-[#1F7B44] w-52 h-12 items-center justify-center text-white font-bold text-md rounded-md mx-36'>
            <div className='flex text-xl items-center justify-center'>
                <AiOutlinePlus />&nbsp;
            </div>
            <div className='flex'>
                Creation Inspection
            </div>
        </div>
    );
}

export default CreateInspectionButton;
